import { Project } from '@/types';
import { cn } from '@/lib/utils';
import ProjectCard from '@/components/ProjectCard';

interface SimpleProjectGridProps {
  projects: Project[];
  className?: string;
}

export default function SimpleProjectGrid({
  projects,
  className = '',
}: SimpleProjectGridProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        /* No Results State */
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0l-4-4m4 4l-4 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No projects found
          </h3>
          <p className="text-muted-foreground mb-4">
            No projects are currently available to display.
          </p>
        </div>
      )}
    </div>
  );
}
