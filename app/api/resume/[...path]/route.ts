import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const resumePath = path.join('/');

    // Construct the Cloudinary URL
    const cloudinaryUrl = `https://res.cloudinary.com/dzmjiq0zg/raw/upload/${resumePath}`;

    console.log('Proxying resume request to:', cloudinaryUrl);

    // Fetch the PDF from Cloudinary
    const response = await fetch(cloudinaryUrl);

    if (!response.ok) {
      console.error('Failed to fetch resume from Cloudinary:', response.status);
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Return the PDF with proper headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return NextResponse.json(
      { error: 'Failed to serve resume' },
      { status: 500 }
    );
  }
}
