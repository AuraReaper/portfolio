import { AboutProps } from '@/types';
import { cn } from '@/lib/utils';

export function About({ developer, className }: AboutProps) {
  const skillCategories = {
    'Gen AI & ML': [
      'Machine Learning',
      'TensorFlow',
      'PyTorch',
      'OpenAI API',
      'LangChain',
    ],
    Backend: [
      'Python',
      'Node.js',
      'Express',
      'FastAPI',
      'REST APIs',
      'GraphQL',
    ],
    Database: ['PostgreSQL', 'MongoDB', 'Redis'],
    'DevOps & Tools': ['Docker', 'AWS', 'Git'],
  };

  // Categorize skills based on developer.skills
  const categorizedSkills = Object.entries(skillCategories).reduce(
    (acc, [category, categorySkills]) => {
      const matchingSkills = developer.skills.filter(skill =>
        categorySkills.includes(skill)
      );
      if (matchingSkills.length > 0) {
        acc[category] = matchingSkills;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  // Add remaining skills to "Other" category
  const categorizedSkillsFlat = Object.values(categorizedSkills).flat();
  const otherSkills = developer.skills.filter(
    skill => !categorizedSkillsFlat.includes(skill)
  );
  if (otherSkills.length > 0) {
    categorizedSkills['Other'] = otherSkills;
  }

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6">
              Hi, I&apos;m {developer.name}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {developer.bio}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Experience
                </h3>
                <p className="text-muted-foreground">{developer.experience}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Role
                </h3>
                <p className="text-muted-foreground">{developer.title}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to
              life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(categorizedSkills).map(([category, skills]) => (
              <div
                key={category}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Interests */}
        <section className="mb-16">
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              What I&apos;m Passionate About
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Artificial Intelligence
                </h3>
                <p className="text-muted-foreground text-sm">
                  Exploring the potential of Gen AI, machine learning models,
                  and intelligent system design.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Backend Architecture
                </h3>
                <p className="text-muted-foreground text-sm">
                  Building robust, scalable backend systems and APIs that handle
                  complex business logic.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Academic Excellence
                </h3>
                <p className="text-muted-foreground text-sm">
                  Committed to continuous learning and academic growth while
                  pursuing my CS degree.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Links */}
        <section className="text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              Let&apos;s Connect
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href={`mailto:${developer.email}`}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[200px]"
              >
                Send me an email
              </a>
              {developer.resume && (
                <a
                  href={developer.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[200px]"
                >
                  Download Resume
                </a>
              )}
            </div>
            <div className="flex justify-center space-x-6">
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
