// Server-side data fetching functions using direct database access
import { db } from '@/lib/db/config';
import { developers, projects } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { Project, DeveloperInfo, ProjectCategory } from '@/types';
import { isValidProjectCategory } from '@/types';

export async function getProjects(): Promise<Project[]> {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return allProjects.map(project => ({
      ...project,
      longDescription: project.longDescription || project.description,
      images: project.images || [],
      completedDate:
        project.completedDate || new Date().toISOString().split('T')[0],
      liveUrl: project.liveUrl || undefined,
      githubUrl: project.githubUrl || undefined,
      featured: project.featured || false,
      category: isValidProjectCategory(project.category)
        ? (project.category as ProjectCategory)
        : 'Other',
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getDeveloperInfo(): Promise<DeveloperInfo | null> {
  try {
    const developer = await db
      .select()
      .from(developers)
      .where(eq(developers.id, 'developer'))
      .limit(1);

    if (developer.length === 0) {
      return null;
    }

    const dev = developer[0];
    return {
      ...dev,
      linkedin: dev.linkedin || '',
      github: dev.github || '',
      resume: dev.resume || undefined,
    };
  } catch (error) {
    console.error('Error fetching developer info:', error);
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    if (project.length === 0) {
      return null;
    }

    const proj = project[0];
    return {
      ...proj,
      longDescription: proj.longDescription || proj.description,
      images: proj.images || [],
      completedDate:
        proj.completedDate || new Date().toISOString().split('T')[0],
      liveUrl: proj.liveUrl || undefined,
      githubUrl: proj.githubUrl || undefined,
      featured: proj.featured || false,
      category: isValidProjectCategory(proj.category)
        ? (proj.category as ProjectCategory)
        : 'Other',
    };
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const featuredProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));

    return featuredProjects.map(project => ({
      ...project,
      longDescription: project.longDescription || project.description,
      images: project.images || [],
      completedDate:
        project.completedDate || new Date().toISOString().split('T')[0],
      liveUrl: project.liveUrl || undefined,
      githubUrl: project.githubUrl || undefined,
      featured: project.featured || false,
      category: isValidProjectCategory(project.category)
        ? (project.category as ProjectCategory)
        : 'Other',
    }));
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}
