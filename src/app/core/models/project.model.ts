export interface Project {
  id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'production' | 'mvp' | 'private' | 'video';
  featured?: boolean;
  gallery?: string[];
  videos?: string[];
}
