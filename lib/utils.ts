import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Project,
  DeveloperInfo,
  FilterOptions,
  SortOption,
  ProjectCategory,
} from '@/types';

// Utility function for combining class names (commonly used with Tailwind CSS)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Client-side data fetching functions (for use in client components)
export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchDeveloperInfo(): Promise<DeveloperInfo | null> {
  try {
    const response = await fetch('/api/developer', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch developer info: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching developer info:', error);
    return null;
  }
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }
}

// Project filtering and sorting functions
export function filterProjects(
  projects: Project[],
  filters: FilterOptions
): Project[] {
  let filteredProjects = [...projects];

  if (filters.featured !== undefined) {
    filteredProjects = filteredProjects.filter(
      project => project.featured === filters.featured
    );
  }

  if (filters.category) {
    filteredProjects = filteredProjects.filter(
      project => project.category === filters.category
    );
  }

  if (filters.technologies && filters.technologies.length > 0) {
    filteredProjects = filteredProjects.filter(project =>
      filters.technologies!.some(tech =>
        project.technologies.some(projectTech =>
          projectTech.toLowerCase().includes(tech.toLowerCase())
        )
      )
    );
  }

  return filteredProjects;
}

export function sortProjects(
  projects: Project[],
  sortBy: SortOption
): Project[] {
  const sortedProjects = [...projects];

  switch (sortBy) {
    case 'newest':
      return sortedProjects.sort(
        (a, b) =>
          new Date(b.completedDate).getTime() -
          new Date(a.completedDate).getTime()
      );
    case 'oldest':
      return sortedProjects.sort(
        (a, b) =>
          new Date(a.completedDate).getTime() -
          new Date(b.completedDate).getTime()
      );
    case 'title':
      return sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
    case 'category':
      return sortedProjects.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    default:
      return sortedProjects;
  }
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectsByCategory(
  projects: Project[],
  category: ProjectCategory
): Project[] {
  return projects.filter(project => project.category === category);
}

export function getUniqueCategories(projects: Project[]): ProjectCategory[] {
  const categories = projects.map(project => project.category);
  return Array.from(new Set(categories)).sort() as ProjectCategory[];
}

export function getUniqueTechnologies(projects: Project[]): string[] {
  const technologies = projects.flatMap(project => project.technologies);
  return Array.from(new Set(technologies)).sort();
}

// Date formatting utilities
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());

  if (diffInMonths === 0) {
    return 'This month';
  } else if (diffInMonths === 1) {
    return '1 month ago';
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInYears === 1) {
      return '1 year ago';
    } else {
      return `${diffInYears} years ago`;
    }
  }
}

// URL and link utilities
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isExternalUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;
  const parsedUrl = new URL(url);
  return parsedUrl.hostname !== window.location.hostname;
}

// Search functionality
export function searchProjects(projects: Project[], query: string): Project[] {
  if (!query.trim()) return projects;

  const lowerQuery = query.toLowerCase();
  return projects.filter(
    project =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.longDescription.toLowerCase().includes(lowerQuery) ||
      project.technologies.some(tech =>
        tech.toLowerCase().includes(lowerQuery)
      ) ||
      project.category.toLowerCase().includes(lowerQuery)
  );
}

// Type guards (re-exported from types for convenience)
export { isValidDeveloperInfo as isDeveloperInfo } from '@/types';

// Error handling utility
export function handleAsyncError<T>(
  promise: Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<[T | null, Error | null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null])
    .catch<[null, Error]>((error: Error) => {
      console.error(errorMessage, error);
      return [null, error];
    });
}
