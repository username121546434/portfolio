export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  tagline?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
  createdAt: Date;
} 