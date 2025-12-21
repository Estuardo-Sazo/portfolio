import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { TechnologiesService } from '../../core/services/technologies-service';
import { TecnologyCard } from '../../shared/ui/tecnology-card/tecnology-card';
import { ProjectsService } from '../../core/services/projects';
import { ProjectCard } from '../../shared/ui/project-card/project-card';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [SectionTitle, TecnologyCard, RouterLink, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  tecnologiesService = inject(TechnologiesService);
  projectsService = inject(ProjectsService);

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Jaime Sazo | Desarrollador Full Stack Angular');

    this.meta.updateTag({
      name: 'description',
      content:
        'Portafolio profesional de Jaime Sazo. Desarrollo aplicaciones modernas con Angular y NestJS.',
    });
  }
}
