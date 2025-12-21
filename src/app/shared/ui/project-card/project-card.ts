import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project!: Project;
}
