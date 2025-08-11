import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProjectById, getProjects } from '@/lib/data';
import { ProjectPageProps } from '@/types';
import ImageCarousel from '@/components/ImageCarousel';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate static params for all projects (for static generation)
export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map(project => ({
    id: project.id,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-16">
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4"
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
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Projects
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4"
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
              </li>
              <li className="text-foreground font-medium" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Title and Featured Badge */}
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground leading-tight">
                  {project.title}
                </h1>
                {project.featured && (
                  <span className="ml-4 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0 border border-yellow-500/20">
                    Featured
                  </span>
                )}
              </div>

              {/* Category and Date */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium">
                  {project.category}
                </span>
                <span>
                  Completed:{' '}
                  {new Date(project.completedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Image Carousel */}
            {project.images && project.images.length > 0 && (
              <div className="px-6 sm:px-8 pb-8">
                <ImageCarousel
                  images={project.images}
                  alt={project.title}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Detailed Description */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              Project Details
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary/20 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation to Other Projects */}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
