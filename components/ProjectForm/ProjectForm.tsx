'use client';

import { useState } from 'react';
import { Project, ProjectCategory } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (project: Omit<Project, 'id'>) => Promise<void>;
  isSubmitting?: boolean;
  submitButtonText?: string;
}

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Full Stack',
  'Frontend',
  'Backend',
  'Mobile',
  'AI/ML',
  'Other',
];

export function ProjectForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitButtonText = 'Save Project',
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    technologies: initialData?.technologies?.join(', ') || '',
    images: initialData?.images?.join('\n') || '',
    liveUrl: initialData?.liveUrl || '',
    githubUrl: initialData?.githubUrl || '',
    featured: initialData?.featured || false,
    category: initialData?.category || ('Other' as ProjectCategory),
    completedDate:
      initialData?.completedDate || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.longDescription.trim()) {
      newErrors.longDescription = 'Long description is required';
    }

    if (!formData.technologies.trim()) {
      newErrors.technologies = 'At least one technology is required';
    }

    if (!formData.completedDate) {
      newErrors.completedDate = 'Completed date is required';
    }

    // Validate URLs if provided
    if (formData.liveUrl && !isValidUrl(formData.liveUrl)) {
      newErrors.liveUrl = 'Please enter a valid URL';
    }

    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadStatus(null);
    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedUrls.push(result.url);
        } else {
          const error = await response.json();
          errors.push(`${file.name}: ${error.error}`);
        }
      } catch {
        errors.push(`${file.name}: Upload failed`);
      }
    }

    // Update the images textarea with uploaded URLs
    if (uploadedUrls.length > 0) {
      const currentImages = formData.images
        ? formData.images.split('\n').filter(Boolean)
        : [];
      const allImages = [...currentImages, ...uploadedUrls];
      setFormData(prev => ({ ...prev, images: allImages.join('\n') }));

      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded ${uploadedUrls.length} image(s)${errors.length > 0 ? `. ${errors.length} failed.` : ''}`,
      });
    }

    if (errors.length > 0 && uploadedUrls.length === 0) {
      setUploadStatus({
        type: 'error',
        message: `Upload failed: ${errors.join(', ')}`,
      });
    }

    // Clear the file input
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      longDescription: formData.longDescription.trim(),
      technologies: formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean),
      images: formData.images
        .split('\n')
        .map(img => img.trim())
        .filter(Boolean),
      liveUrl: formData.liveUrl.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      featured: formData.featured,
      category: formData.category,
      completedDate: formData.completedDate,
    };

    await onSubmit(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Project Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground transition-colors',
            errors.title ? 'border-destructive' : 'border-border'
          )}
          placeholder="My Awesome Project"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Short Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground resize-none transition-colors',
            errors.description ? 'border-destructive' : 'border-border'
          )}
          placeholder="A brief description of your project that appears on project cards..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Long Description */}
      <div>
        <label
          htmlFor="longDescription"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Detailed Description *
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows={6}
          value={formData.longDescription}
          onChange={handleChange}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground resize-none transition-colors',
            errors.longDescription ? 'border-destructive' : 'border-border'
          )}
          placeholder="A comprehensive description of your project, including features, challenges, and technical details..."
        />
        {errors.longDescription && (
          <p className="mt-1 text-sm text-destructive">
            {errors.longDescription}
          </p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <label
          htmlFor="technologies"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Technologies Used *
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground transition-colors',
            errors.technologies ? 'border-destructive' : 'border-border'
          )}
          placeholder="React, Next.js, TypeScript, Node.js, PostgreSQL"
        />
        <p className="mt-1 text-sm text-muted-foreground">
          Separate technologies with commas
        </p>
        {errors.technologies && (
          <p className="mt-1 text-sm text-destructive">{errors.technologies}</p>
        )}
      </div>

      {/* URLs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Live Demo URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground transition-colors',
              errors.liveUrl ? 'border-destructive' : 'border-border'
            )}
            placeholder="https://myproject.vercel.app"
          />
          {errors.liveUrl && (
            <p className="mt-1 text-sm text-destructive">{errors.liveUrl}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="githubUrl"
            className="block text-sm font-medium text-foreground mb-2"
          >
            GitHub Repository URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground transition-colors',
              errors.githubUrl ? 'border-destructive' : 'border-border'
            )}
            placeholder="https://github.com/username/project"
          />
          {errors.githubUrl && (
            <p className="mt-1 text-sm text-destructive">{errors.githubUrl}</p>
          )}
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Project Images
        </label>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="imageUpload"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="imageUpload"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-card-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-colors"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Select multiple images (JPEG, PNG, WebP, GIF - max 5MB each)
          </p>
        </div>

        {/* Image URLs (Manual Entry) */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Or Enter Image URLs Manually
          </label>
          <textarea
            id="images"
            name="images"
            rows={4}
            value={formData.images}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground resize-none transition-colors"
            placeholder={`https://placehold.co/800x500/3b82f6/ffffff?text=Project+Screenshot
https://placehold.co/800x500/8b5cf6/ffffff?text=Dashboard+View
https://placehold.co/800x500/10b981/ffffff?text=Mobile+View`}
          />
          <p className="mt-1 text-sm text-muted-foreground">
            One image URL per line
          </p>
        </div>

        {/* Upload Status */}
        {uploadStatus && (
          <div
            className={`mt-2 p-2 rounded text-sm ${
              uploadStatus.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            {uploadStatus.message}
          </div>
        )}
      </div>

      {/* Category and Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground transition-colors"
          >
            {PROJECT_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="completedDate"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Completed Date *
          </label>
          <input
            type="date"
            id="completedDate"
            name="completedDate"
            value={formData.completedDate}
            onChange={handleChange}
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground transition-colors',
              errors.completedDate ? 'border-destructive' : 'border-border'
            )}
          />
          {errors.completedDate && (
            <p className="mt-1 text-sm text-destructive">
              {errors.completedDate}
            </p>
          )}
        </div>

        <div className="flex items-center pt-7">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
          <label htmlFor="featured" className="ml-2 text-sm text-foreground">
            Featured Project
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end pt-6 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Saving...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}
