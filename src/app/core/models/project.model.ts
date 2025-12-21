export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'production' | 'mvp' | 'private' | 'video';
  featured?: boolean;
}
