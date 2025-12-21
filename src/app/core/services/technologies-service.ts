import { Injectable, signal } from '@angular/core';
import { Tecnology } from '../models/tecnology.model';

@Injectable({ providedIn: 'root' })
export class TechnologiesService {
  private _technologies = signal<Tecnology[]>([
    { name: 'Angular', icon: 'icons/angular.svg' },
    { name: 'NestJS', icon: 'icons/nestjs.png' },
    { name: 'TypeScript', icon: 'icons/typescript.svg' },
    { name: 'Odoo', icon: 'icons/odoo.jpeg' },
    { name: 'Laravel', icon: 'icons/laravel.svg' },
    { name: 'Java', icon: 'icons/java.svg' },
    { name: 'MySQL', icon: 'icons/mysql.png' },
    { name: 'MongoDB', icon: 'icons/mongodb.svg' },
    { name: 'PostgreSQL', icon: 'icons/postgresql.jpeg' },
    { name: 'Git', icon: 'icons/git.svg' },
    { name: 'Docker', icon: 'icons/docker.svg' },
    { name: 'n8n', icon: 'icons/n8n.png' },
  ]);

  technologies = this._technologies.asReadonly();
}
