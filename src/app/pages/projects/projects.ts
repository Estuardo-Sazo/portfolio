import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/services/projects';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { CommonModule } from '@angular/common';
import { ProjectCard } from '../../shared/ui/project-card/project-card';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, SectionTitle, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projectsService = inject(ProjectsService);

  title = inject(Title);
  meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Proyectos | Jaime Sazo');

    this.meta.updateTag({
      name: 'description',
      content: 'Proyectos desarrollados con Angular, NestJS, Odoo y PostgreSQL.',
    });
  }
}
