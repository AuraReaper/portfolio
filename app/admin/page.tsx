import { Metadata } from 'next';
import { getProjects, getDeveloperInfo } from '@/lib/data';
import Link from 'next/link';
import ResumeUpload from '@/components/ResumeUpload';
// import { ProjectCard } from '@/components/ProjectCard';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Admin Dashboard | Portfolio',
  description: 'Manage your portfolio projects',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboard() {
  const [projects, developerInfo] = await Promise.all([
    getProjects(),
    getDeveloperInfo(),
  ]);

  return (
    <div className="pt-16">
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your portfolio projects
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Project
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
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
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {projects.length}
                  </h3>
                  <p className="text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {projects.filter(p => p.featured).length}
                  </h3>
                  <p className="text-muted-foreground">Featured</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {new Set(projects.map(p => p.category)).size}
                  </h3>
                  <p className="text-muted-foreground">Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Management */}
          <div className="mb-8">
            <ResumeUpload currentResumeUrl={developerInfo?.resume} />
          </div>

          {/* Projects List */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">
                All Projects
              </h2>
              <p className="text-muted-foreground text-sm">
                {projects.length} projects
              </p>
            </div>

            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="border border-border rounded-lg p-4 hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-card-foreground">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="px-2 py-1 text-xs bg-yellow-500/10 text-yellow-600 rounded-full border border-yellow-500/20">
                              Featured
                            </span>
                          )}
                          <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="px-2 py-1 text-xs text-muted-foreground">
                              +{project.technologies.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link
                          href={`/projects/${project.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          title="View Project"
                        >
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          title="Edit Project"
                        >
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M19 11H5m14 0l-4-4m4 4l-4 4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Projects Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get started by adding your first project.
                </p>
                <Link
                  href="/admin/projects/new"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Your First Project
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
