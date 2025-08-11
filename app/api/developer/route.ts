import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { developers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const developer = await db
      .select()
      .from(developers)
      .where(eq(developers.id, 'developer'))
      .limit(1);

    if (developer.length === 0) {
      return NextResponse.json(
        { error: 'Developer info not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(developer[0]);
  } catch (error) {
    console.error('Error reading developer info:', error);
    return NextResponse.json(
      { error: 'Failed to read developer info' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json();

    const updatedDeveloper = await db
      .update(developers)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(developers.id, 'developer'))
      .returning();

    if (updatedDeveloper.length === 0) {
      return NextResponse.json(
        { error: 'Developer info not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDeveloper[0]);
  } catch (error) {
    console.error('Error updating developer info:', error);
    return NextResponse.json(
      { error: 'Failed to update developer info' },
      { status: 500 }
    );
  }
}
