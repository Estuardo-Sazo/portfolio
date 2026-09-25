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
  /** Aspect of the screenshots: 'mobile' (portrait) or 'desktop' (landscape, default). */
  galleryLayout?: 'mobile' | 'desktop';
}

export type ProjectStatusMeta = { label: string; dot: string; chip: string };

export const PROJECT_STATUS_META: Record<Project['status'], ProjectStatusMeta> = {
  production: {
    label: 'Producción',
    dot: 'bg-emerald-400',
    chip: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  mvp: {
    label: 'MVP',
    dot: 'bg-blue-400',
    chip: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  },
  video: {
    label: 'Video',
    dot: 'bg-orange-400',
    chip: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  },
  private: {
    label: 'Privado',
    dot: 'bg-faint',
    chip: 'text-faint border-line bg-elevated',
  },
};
