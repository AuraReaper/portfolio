'use client';

import { useState } from 'react';

interface ResumeUploadProps {
  currentResumeUrl?: string;
  onUploadSuccess?: (newResumeUrl: string) => void;
}

export default function ResumeUpload({
  currentResumeUrl,
  onUploadSuccess,
}: ResumeUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setUploadStatus({
        type: 'error',
        message: 'Please upload a PDF file only.',
      });
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadStatus({
        type: 'error',
        message: 'File too large. Maximum size is 5MB.',
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'resume');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // Update developer.json with new resume URL
        await fetch('/api/developer', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resume: result.url,
          }),
        });

        setUploadStatus({
          type: 'success',
          message: 'Resume updated successfully!',
        });

        if (onUploadSuccess) {
          onUploadSuccess(result.url);
        }
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Upload failed',
      });
    } finally {
      setIsUploading(false);
      // Clear the file input
      e.target.value = '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Resume Management
      </h3>

      {currentResumeUrl && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Current Resume:</p>
          <div className="flex items-center space-x-3">
            <a
              href={currentResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="resume.pdf"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Current Resume
            </a>
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="resume-upload"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Upload New Resume (PDF only)
        </label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,application/pdf"
          onChange={handleResumeUpload}
          disabled={isUploading}
          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-card-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-colors disabled:opacity-50"
        />
        <p className="mt-1 text-sm text-muted-foreground">
          PDF files only, maximum 5MB
        </p>
      </div>

      {uploadStatus && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            uploadStatus.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}
        >
          {uploadStatus.message}
        </div>
      )}

      {isUploading && (
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Uploading resume...
        </div>
      )}
    </div>
  );
}
