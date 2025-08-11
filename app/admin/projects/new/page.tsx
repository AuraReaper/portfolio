'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProjectForm } from '@/components/ProjectForm';
import type { Project } from '@/types';

export default function AddProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (projectData: Omit<Project, 'id'>) => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      // Redirect to admin dashboard on success
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground">
                Add New Project
              </h1>
              <Link
                href="/admin"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
            <p className="text-muted-foreground">
              Fill out the form below to add a new project to your portfolio.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <ProjectForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitButtonText="Create Project"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
