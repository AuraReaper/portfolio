'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ProjectForm } from '@/components/ProjectForm';
import type { Project } from '@/types';

export default function EditProjectPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error('Failed to load project');
        }

        const projectData = await response.json();
        setProject(projectData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const handleSubmit = async (projectData: Omit<Project, 'id'>) => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update project');
      }

      // Redirect to admin dashboard on success
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      // Redirect to admin dashboard on success
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDeleteConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16">
        <div className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading project...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="pt-16">
        <div className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Link
                href="/admin"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground">
                Edit Project
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    deleteConfirm
                      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                      : 'text-destructive border border-destructive hover:bg-destructive/10'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {deleteConfirm ? 'Confirm Delete' : 'Delete Project'}
                </button>
                <Link
                  href="/admin"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  ← Back to Dashboard
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground">
              Edit the project details below. Changes will be saved to your
              portfolio.
            </p>
            {deleteConfirm && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                Are you sure you want to delete this project? This action cannot
                be undone.
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="ml-2 underline hover:no-underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          {project && (
            <div className="bg-card border border-border rounded-lg p-6">
              <ProjectForm
                initialData={project}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitButtonText="Update Project"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
