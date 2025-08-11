import { db } from './config';
import { sql } from 'drizzle-orm';

export async function initializeDatabase() {
  try {
    // Create tables if they don't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS developers (
        id TEXT PRIMARY KEY DEFAULT 'developer',
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        bio TEXT NOT NULL,
        skills JSON NOT NULL,
        experience TEXT NOT NULL,
        email TEXT NOT NULL,
        linkedin TEXT,
        github TEXT,
        resume TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        technologies JSON NOT NULL,
        images JSON DEFAULT '[]',
        github_url TEXT,
        live_url TEXT,
        featured BOOLEAN DEFAULT FALSE,
        category TEXT NOT NULL,
        completed_date TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    return false;
  }
}
