import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { TechnologiesService } from '../../core/services/technologies-service';
import { TecnologyCard } from '../../shared/ui/tecnology-card/tecnology-card';
import { ProjectsService } from '../../core/services/projects';
import { ProjectCard } from '../../shared/ui/project-card/project-card';
import { SeoService } from '../../core/services/seo';
import { RevealDirective } from '../../shared/directives/reveal';

@Component({
  selector: 'app-home',
  imports: [SectionTitle, TecnologyCard, RouterLink, ProjectCard, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  readonly careerStartYear = 2019;

  tecnologiesService = inject(TechnologiesService);
  projectsService = inject(ProjectsService);

  private seo = inject(SeoService);

  get yearsOfExperience(): number {
    return new Date().getFullYear() - this.careerStartYear;
  }

  ngOnInit() {
    this.seo.update({
      title: 'Desarrollador Full Stack',
      description:
        'Ingeniero de Sistemas y desarrollador full-stack. Construyo aplicaciones web escalables con Angular, NestJS, Laravel y Odoo.',
      path: '/',
      type: 'profile',
    });
  }
}
