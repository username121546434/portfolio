import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export interface Project {
  name: string;
  description: string | null;
  stars: number;
  url: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github size={16} />
          <span>{project.stars} stars</span>
        </div>
        <a 
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
        >
          View <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}