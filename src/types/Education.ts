export interface Education {
  id: string;
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  present: boolean;
  description?: string;
  courses?: string[];
  achievements?: string[];
  grade?: string;
  location?: string;
  order: number;
  createdAt: Date;
} 