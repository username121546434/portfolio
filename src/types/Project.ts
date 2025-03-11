export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured: boolean;
  order: number;
  createdAt: Date;
} 