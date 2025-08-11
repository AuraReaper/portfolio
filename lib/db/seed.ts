import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

import { db } from './config';
import { developers, projects } from './schema';
import developerData from '../../data/developer.json';
import projectsData from '../../data/projects.json';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Seed developer data
    await db
      .insert(developers)
      .values({
        id: 'developer',
        name: developerData.developer.name,
        title: developerData.developer.title,
        bio: developerData.developer.bio,
        skills: developerData.developer.skills,
        experience: developerData.developer.experience,
        email: developerData.developer.email,
        linkedin: developerData.developer.linkedin,
        github: developerData.developer.github,
        resume: developerData.developer.resume,
      })
      .onConflictDoUpdate({
        target: developers.id,
        set: {
          name: developerData.developer.name,
          title: developerData.developer.title,
          bio: developerData.developer.bio,
          skills: developerData.developer.skills,
          experience: developerData.developer.experience,
          email: developerData.developer.email,
          linkedin: developerData.developer.linkedin,
          github: developerData.developer.github,
          resume: developerData.developer.resume,
          updatedAt: new Date(),
        },
      });

    // Seed projects data
    for (const project of projectsData.projects) {
      await db
        .insert(projects)
        .values({
          id: project.id,
          title: project.title,
          description: project.description,
          longDescription: project.longDescription,
          technologies: project.technologies,
          images: project.images,
          githubUrl: project.githubUrl,
          featured: project.featured,
          category: project.category,
          completedDate: project.completedDate,
        })
        .onConflictDoUpdate({
          target: projects.id,
          set: {
            title: project.title,
            description: project.description,
            longDescription: project.longDescription,
            technologies: project.technologies,
            images: project.images,
            githubUrl: project.githubUrl,
            featured: project.featured,
            category: project.category,
            completedDate: project.completedDate,
            updatedAt: new Date(),
          },
        });
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
