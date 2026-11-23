export type ProjectType =
  | 'Website'
  | 'Web Application'
  | 'Java Full Stack Project'
  | 'REST API'
  | 'Database'
  | 'UI Development'
  | 'Other';

export type MessageStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  featured: boolean;
  category?: 'Full Stack' | 'Backend' | 'Frontend' | 'Enterprise';
  highlights?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  technologies?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  percentage: number;
  icon?: string;
  experienceYears?: string;
  createdAt?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  location?: string;
  keyAchievements?: string[];
  createdAt?: string;
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientRole: string;
  message: string;
  imageUrl: string;
  rating: number;
  company?: string;
  createdAt?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  projectType: ProjectType;
  budget?: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface SocialLink {
  id: number;
  platform: 'github' | 'linkedin' | 'instagram' | 'x' | 'email';
  url: string;
  icon: string;
  isActive: boolean;
}

export interface Profile {
  id: number;
  name: string;
  headline: string;
  bio: string;
  profileImage: string;
  resumeUrl: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl?: string;
  education?: string;
  philosophy?: string;
}
