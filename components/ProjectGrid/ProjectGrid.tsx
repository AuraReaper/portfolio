'use client';

import { useState, useMemo } from 'react';
import { Project, ProjectCategory, SortOption } from '@/types';
import {
  cn,
  // filterProjects,
  sortProjects,
  searchProjects,
  getUniqueCategories,
} from '@/lib/utils';
import ProjectCard from '@/components/ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  featured?: boolean;
  category?: string;
  className?: string;
}

export default function ProjectGrid({
  projects,
  featured = false,
  category,
  className = '',
}: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | 'all'
  >('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Get unique categories from projects
  const categories = useMemo(() => getUniqueCategories(projects), [projects]);

  // Filter and sort projects based on current state
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Apply featured filter if specified
    if (featured) {
      result = result.filter(project => project.featured);
    }

    // Apply category filter if specified in props
    if (category) {
      result = result.filter(project => project.category === category);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchProjects(result, searchQuery);
    }

    // Apply category filter from dropdown
    if (selectedCategory !== 'all') {
      result = result.filter(project => project.category === selectedCategory);
    }

    // Sort projects
    result = sortProjects(result, sortBy);

    return result;
  }, [projects, featured, category, searchQuery, selectedCategory, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as ProjectCategory | 'all');
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg leading-5 bg-card text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <svg
                className="h-5 w-5 text-muted-foreground hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="category-filter"
                className="text-sm font-medium text-foreground whitespace-nowrap"
              >
                Category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="block w-full sm:w-auto px-3 py-2 border border-border rounded-md bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="sort-filter"
                className="text-sm font-medium text-foreground whitespace-nowrap"
              >
                Sort by:
              </label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={handleSortChange}
                className="block w-full sm:w-auto px-3 py-2 border border-border rounded-md bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery ||
            selectedCategory !== 'all' ||
            sortBy !== 'newest') && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedProjects.length === projects.length
            ? `Showing all ${projects.length} project${projects.length !== 1 ? 's' : ''}`
            : `Showing ${filteredAndSortedProjects.length} of ${projects.length} project${projects.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        /* No Results State */
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No projects found
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? (
              <>
                No projects match your search criteria. Try adjusting your
                search or filters.
              </>
            ) : (
              <>
                No projects match the selected filters. Try adjusting your
                filters.
              </>
            )}
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
