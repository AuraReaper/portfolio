'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({
  project,
  className = '',
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Get the first image or use a placeholder
  const primaryImage =
    project.images && project.images.length > 0 ? project.images[0] : null;

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        'group block bg-card border border-border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden',
        className
      )}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-secondary overflow-hidden">
        {primaryImage && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-secondary animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={primaryImage}
              alt={`${project.title} screenshot`}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-2 bg-secondary rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm">No image available</p>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Category and Date */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
            {project.category}
          </span>
          <span>
            {new Date(project.completedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </span>
        </div>

        {/* Hover indicator */}
        <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-medium">View Details</span>
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
