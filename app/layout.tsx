import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Yash Developer | Full Stack Developer Portfolio',
  description:
    'Portfolio website of Yash Developer - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: [
    'Full Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Yash Developer' }],
  creator: 'Yash Developer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yash.dev',
    title: 'Yash Developer | Full Stack Developer Portfolio',
    description:
      'Portfolio website of Yash Developer - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    siteName: 'Yash Developer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yash Developer | Full Stack Developer Portfolio',
    description:
      'Portfolio website of Yash Developer - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    creator: '@yashdeveloper',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
