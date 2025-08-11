// Core data models for the developer portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  completedDate: string;
}

export interface DeveloperInfo {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: string;
  email: string;
  linkedin: string;
  github: string;
  resume?: string;
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface ProjectGridProps {
  projects: Project[];
  featured?: boolean;
  category?: string;
  className?: string;
}

export interface HeroProps {
  developer: DeveloperInfo;
  className?: string;
}

export interface AboutProps {
  developer: DeveloperInfo;
  className?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavigationProps {
  items?: NavItem[];
  className?: string;
}

// Page prop types for Next.js pages
export interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface ProjectsPageProps {
  searchParams?: Promise<{
    category?: string;
    search?: string;
    sort?: SortOption;
  }>;
}

export interface HomePageProps {
  projects: Project[];
  developer: DeveloperInfo;
}

// Loading and error state types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ProjectLoadingProps {
  count?: number;
  className?: string;
}

// Image carousel types
export interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

// Search and filter types
export interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterProps {
  categories: ProjectCategory[];
  selectedCategory?: ProjectCategory;
  onCategoryChange: (category: ProjectCategory | undefined) => void;
  className?: string;
}

// API response types
export interface ProjectsResponse {
  projects: Project[];
}

export interface DeveloperResponse {
  developer: DeveloperInfo;
}

// Utility types
export type ProjectCategory =
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'AI/ML'
  | 'Other';

export type SortOption = 'newest' | 'oldest' | 'title' | 'category';

export interface FilterOptions {
  category?: ProjectCategory;
  featured?: boolean;
  technologies?: string[];
}

export interface SortAndFilterProps {
  projects: Project[];
  sortBy?: SortOption;
  filters?: FilterOptions;
}

// Data validation utilities
export const isValidProject = (obj: any): obj is Project => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    obj.id.length > 0 &&
    typeof obj.title === 'string' &&
    obj.title.length > 0 &&
    typeof obj.description === 'string' &&
    obj.description.length > 0 &&
    typeof obj.longDescription === 'string' &&
    obj.longDescription.length > 0 &&
    Array.isArray(obj.technologies) &&
    obj.technologies.every((tech: any) => typeof tech === 'string') &&
    Array.isArray(obj.images) &&
    obj.images.every((img: any) => typeof img === 'string') &&
    (obj.liveUrl === undefined || typeof obj.liveUrl === 'string') &&
    (obj.githubUrl === undefined || typeof obj.githubUrl === 'string') &&
    typeof obj.featured === 'boolean' &&
    typeof obj.category === 'string' &&
    typeof obj.completedDate === 'string' &&
    isValidDate(obj.completedDate)
  );
};

export const isValidDeveloperInfo = (obj: any): obj is DeveloperInfo => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    obj.name.length > 0 &&
    typeof obj.title === 'string' &&
    obj.title.length > 0 &&
    typeof obj.bio === 'string' &&
    obj.bio.length > 0 &&
    Array.isArray(obj.skills) &&
    obj.skills.every((skill: any) => typeof skill === 'string') &&
    typeof obj.experience === 'string' &&
    obj.experience.length > 0 &&
    typeof obj.email === 'string' &&
    isValidEmail(obj.email) &&
    typeof obj.linkedin === 'string' &&
    isValidUrl(obj.linkedin) &&
    typeof obj.github === 'string' &&
    isValidUrl(obj.github) &&
    (obj.resume === undefined || typeof obj.resume === 'string')
  );
};

export const isValidProjectArray = (obj: any): obj is Project[] => {
  return Array.isArray(obj) && obj.every(isValidProject);
};

// Helper validation functions
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return (
    !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0]
  );
};

export const isValidProjectCategory = (
  category: string
): category is ProjectCategory => {
  const validCategories: ProjectCategory[] = [
    'Full Stack',
    'Frontend',
    'Backend',
    'Mobile',
    'AI/ML',
    'Other',
  ];
  return validCategories.includes(category as ProjectCategory);
};

// Data sanitization utilities
export const sanitizeProject = (project: Partial<Project>): Project | null => {
  if (!project.id || !project.title || !project.description) {
    return null;
  }

  return {
    id: String(project.id).trim(),
    title: String(project.title).trim(),
    description: String(project.description).trim(),
    longDescription: String(
      project.longDescription || project.description
    ).trim(),
    technologies: Array.isArray(project.technologies)
      ? project.technologies.map(tech => String(tech).trim()).filter(Boolean)
      : [],
    images: Array.isArray(project.images)
      ? project.images.map(img => String(img).trim()).filter(Boolean)
      : [],
    liveUrl: project.liveUrl ? String(project.liveUrl).trim() : undefined,
    githubUrl: project.githubUrl ? String(project.githubUrl).trim() : undefined,
    featured: Boolean(project.featured),
    category: isValidProjectCategory(String(project.category))
      ? (project.category as ProjectCategory)
      : 'Other',
    completedDate: project.completedDate
      ? String(project.completedDate).trim()
      : new Date().toISOString().split('T')[0],
  };
};

export const sanitizeDeveloperInfo = (
  developer: Partial<DeveloperInfo>
): DeveloperInfo | null => {
  if (!developer.name || !developer.title || !developer.email) {
    return null;
  }

  return {
    name: String(developer.name).trim(),
    title: String(developer.title).trim(),
    bio: String(developer.bio || '').trim(),
    skills: Array.isArray(developer.skills)
      ? developer.skills.map(skill => String(skill).trim()).filter(Boolean)
      : [],
    experience: String(developer.experience || '').trim(),
    email: String(developer.email).trim(),
    linkedin: String(developer.linkedin || '').trim(),
    github: String(developer.github || '').trim(),
    resume: developer.resume ? String(developer.resume).trim() : undefined,
  };
};
