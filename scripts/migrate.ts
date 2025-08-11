#!/usr/bin/env tsx

import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

import { initializeDatabase } from '../lib/db/init';
import { db } from '../lib/db/config';
import { developers, projects } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

async function migrate() {
  console.log('🚀 Starting database migration...');

  // Initialize database tables
  const initialized = await initializeDatabase();
  if (!initialized) {
    process.exit(1);
  }

  // Check if we need to seed initial data
  try {
    const existingDeveloper = await db
      .select()
      .from(developers)
      .where(eq(developers.id, 'developer'))
      .limit(1);

    if (existingDeveloper.length === 0) {
      console.log('📝 Seeding initial developer data...');

      // Seed initial developer data
      await db.insert(developers).values({
        id: 'developer',
        name: 'Yash Developer',
        title: 'Gen AI & Backend Engineer',
        bio: 'Computer Science undergraduate passionate about Generative AI and backend engineering. I love building intelligent systems and scalable backend solutions that solve real-world problems. Currently exploring machine learning, AI model integration, and distributed systems while pursuing my degree.',
        skills: [
          'Python',
          'Machine Learning',
          'TensorFlow',
          'PyTorch',
          'OpenAI API',
          'LangChain',
          'Node.js',
          'Express',
          'FastAPI',
          'PostgreSQL',
          'MongoDB',
          'Redis',
          'Docker',
          'AWS',
          'REST APIs',
          'GraphQL',
          'Git',
          'JavaScript',
          'TypeScript',
        ],
        experience: 'University Student',
        email: 'yashkr104@gmail.com',
        linkedin: 'https://www.linkedin.com/in/yashkumar21/',
        github: 'https://github.com/AuraReaper',
        resume: '/uploads/1754931708038-YashKumarGupta.pdf',
      });
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
