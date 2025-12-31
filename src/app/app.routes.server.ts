import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS_DATA } from './core/services/projects';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return PROJECTS_DATA.map((project) => ({ id: project.id! }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
