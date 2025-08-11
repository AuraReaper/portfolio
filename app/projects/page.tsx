import { Metadata } from 'next';
import { getProjects } from '@/lib/data';
import SimpleProjectGrid from '@/components/SimpleProjectGrid';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description:
    'Browse through my portfolio of web development projects, featuring full-stack applications, frontend interfaces, and backend services.',
  openGraph: {
    title: 'Projects | Portfolio',
    description:
      'Browse through my portfolio of web development projects, featuring full-stack applications, frontend interfaces, and backend services.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Projects | Portfolio',
    description:
      'Browse through my portfolio of web development projects, featuring full-stack applications, frontend interfaces, and backend services.',
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-16">
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              My Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my portfolio of web development projects, showcasing a
              range of technologies and solutions from full-stack applications
              to specialized frontend and backend services.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Projects Section */}
          <section>
            {projects.length > 0 ? (
              <SimpleProjectGrid projects={projects} />
            ) : (
              /* No Projects State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
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
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  No Projects Yet
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Projects are currently being added to the portfolio. Check
                  back soon to see my latest work!
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
