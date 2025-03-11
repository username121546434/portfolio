import React from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
import { Project as ProjectType } from '../types/Project';

// Create a local interface that extends the Project type with a url property for backward compatibility
export interface Project extends Omit<ProjectType, 'id'> {
  url?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
      
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a 
              href={project.githubUrl || project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Github size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
        {(project.stars !== undefined) && (
          <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
            <Star size={16} />
            <span className="text-sm">{project.stars}</span>
          </div>
        )}
      </div>
    </div>
  );
}