import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { projects } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));

    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json(
      { error: 'Failed to read projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json();

    // Generate new ID
    const newId = generateProjectId(projectData.title);

    // Create new project
    const newProject = await db
      .insert(projects)
      .values({
        ...projectData,
        id: newId,
      })
      .returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

function generateProjectId(title: string): string {
  // Generate URL-friendly ID from title
  const baseId = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now();
  return `${baseId}-${timestamp}`;
}
