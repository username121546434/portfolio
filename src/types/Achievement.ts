export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  imageUrl?: string;
  certificateUrl?: string;
  order: number;
  category?: string; // For filtering different types of achievements
  createdAt: Date;
} 