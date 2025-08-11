import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type: string | null = data.get('type') as string;

    console.log('Upload request received:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      uploadType: type,
      hasCloudinary: !!(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ),
      hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type based on upload type
    let allowedTypes: string[] = [];
    let errorMessage: string = '';

    if (type === 'resume') {
      allowedTypes = ['application/pdf'];
      errorMessage =
        'Invalid file type. Only PDF files are allowed for resumes.';
    } else {
      // Default to image types for project images
      allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
      ];
      errorMessage =
        'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.';
    }

    if (!allowedTypes.includes(file.type)) {
      console.log('File type validation failed:', file.type);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.log('File size validation failed:', file.size);
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // For PDFs (resumes), use Vercel Blob as it's more reliable for documents
    if (type === 'resume') {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.log('Vercel Blob not configured for resume upload');
        return NextResponse.json(
          {
            error: 'Resume upload failed - Vercel Blob not configured',
            details: 'BLOB_READ_WRITE_TOKEN environment variable is missing',
          },
          { status: 500 }
        );
      }

      try {
        const { put } = await import('@vercel/blob');
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        console.log('Attempting Vercel Blob upload for PDF:', filename);

        const blob = await put(filename, file, {
          access: 'public',
        });

        console.log('Vercel Blob upload successful:', blob.url);
        return NextResponse.json({
          message: 'File uploaded successfully',
          url: blob.url,
          filename: filename,
        });
      } catch (blobError) {
        console.error('Vercel Blob upload failed:', blobError);
        return NextResponse.json(
          {
            error: 'Resume upload failed',
            details:
              blobError instanceof Error ? blobError.message : 'Unknown error',
          },
          { status: 500 }
        );
      }
    }

    // For images, use Cloudinary for better image processing and optimization
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.log('Cloudinary not configured for image upload');
      return NextResponse.json(
        {
          error: 'Image upload failed - Cloudinary not configured',
          details: 'Cloudinary environment variables are missing',
        },
        { status: 500 }
      );
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Generate unique public_id (remove extension to avoid double extensions)
    const timestamp = Date.now();
    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    const publicId = `portfolio/${timestamp}-${fileNameWithoutExt.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    console.log('Attempting Cloudinary upload...');

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: publicId,
      resource_type: type === 'resume' ? 'raw' : 'image',
      folder: 'portfolio',
      // Ensure public access
      type: 'upload',
      access_mode: 'public',
      // For PDFs, ensure proper content type
      ...(type === 'resume' && {
        format: 'pdf',
      }),
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      filename: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
