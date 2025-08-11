import { About } from '@/components/About/About';
import { getDeveloperInfo } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Yash Developer',
  description:
    'Learn more about Yash Developer - Full Stack Developer with 3+ years of experience in React, Next.js, Node.js, and modern web technologies.',
  openGraph: {
    title: 'About | Yash Developer',
    description:
      'Learn more about Yash Developer - Full Stack Developer with 3+ years of experience in React, Next.js, Node.js, and modern web technologies.',
  },
};

export default async function AboutPage() {
  const developerInfo = await getDeveloperInfo();

  if (!developerInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <p className="text-muted-foreground">
          Failed to load developer information.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <About developer={developerInfo} />
    </div>
  );
}
