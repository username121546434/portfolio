export interface Extracurricular {
  id: string;
  title: string;
  organization?: string;
  description: string;
  startDate: string;
  endDate?: string;
  present: boolean;
  role?: string;
  achievements?: string[];
  imageUrl?: string;
  order: number;
  createdAt: Date;
} 