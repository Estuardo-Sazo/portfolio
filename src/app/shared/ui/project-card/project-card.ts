import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.model';

type StatusMeta = { label: string; dot: string; chip: string };

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project!: Project;

  readonly statusMeta: Record<Project['status'], StatusMeta> = {
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
}
