import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, PROJECT_STATUS_META } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project!: Project;

  readonly statusMeta = PROJECT_STATUS_META;
}
