import { pgTable, text, timestamp, boolean, json } from 'drizzle-orm/pg-core';

export const developers = pgTable('developers', {
  id: text('id').primaryKey().default('developer'),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: text('bio').notNull(),
  skills: json('skills').$type<string[]>().notNull(),
  experience: text('experience').notNull(),
  email: text('email').notNull(),
  linkedin: text('linkedin'),
  github: text('github'),
  resume: text('resume'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  technologies: json('technologies').$type<string[]>().notNull(),
  images: json('images').$type<string[]>().default([]),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  featured: boolean('featured').default(false),
  category: text('category').notNull(),
  completedDate: text('completed_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Developer = typeof developers.$inferSelect;
export type NewDeveloper = typeof developers.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
