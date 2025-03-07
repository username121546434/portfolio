import React from 'react';
import { Code2 } from 'lucide-react';
import { Project, ProjectCard } from './ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export function ProjectsSection({ projects, loading, error }: ProjectsSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Code2 size={32} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold">Featured Projects</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="col-span-3 text-center py-12 text-red-600 dark:text-red-400">
            <p>{error}</p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))
        )}
      </div>
    </section>
  );
}