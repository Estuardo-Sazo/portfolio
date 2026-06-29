import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/services/projects';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { ProjectCard } from '../../shared/ui/project-card/project-card';
import { SeoService } from '../../core/services/seo';

@Component({
  selector: 'app-projects',
  imports: [SectionTitle, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projectsService = inject(ProjectsService);
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.update({
      title: 'Proyectos',
      description:
        'Proyectos desarrollados con Angular, React, NestJS, Odoo y más. Aplicaciones web, PWAs e integraciones ERP.',
      path: '/projects',
    });
  }
}
