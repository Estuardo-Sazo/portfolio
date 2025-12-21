import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private _projects = signal<Project[]>([
    {
      title: 'App web PWA Mi Flota',
      description:
        'App web PWA para la gestión de vehiculos, registrar gastos e ingresos, y generar reportes.',
      technologies: ['Angular', 'Dexie.js', 'Git'],
      demoUrl: 'https://estuardo-sazo.github.io/mi-flota-app/',
      status: 'production',
      featured: false,
    },
    {
      title: 'DocuAlChilazo ',
      description: 'Genera cartas, solicitudes, CV y más con un editor visual tipo Canva.',
      technologies: ['Astro', 'React', 'Vercel', 'Tailwind', 'Supabase'],
      demoUrl: 'https://www.docalchilazo.site/',
      status: 'production',
    },
    {
      title: 'Plugin para Odoo (Facturación Electrónica) con Factus',
      description: 'Plugin para Odoo que permite facturar electrónica con Factus.',
      technologies: ['Python', 'Odoo', 'ApiRest', 'Factus'],
      demoUrl: 'https://www.youtube.com/watch?v=3fVen8smOqc',
      status: 'video',
    },

    {
      title: 'Plugin básico para Odoo Alquiler de vehículos',
      description: 'Plugin para Odoo 17 que permite alquilar vehículos.',
      technologies: ['Python', 'Odoo', 'Plugin', 'Community'],
      demoUrl: 'https://youtu.be/deDoevPV_jg',
      status: 'video',
    },
    {
      title: 'Módulo para Bloquear Ventas Negativas en Odoo',
      description: 'Módulo para Odoo 15 que permite bloquear ventas negativas.',
      technologies: ['Python', 'Odoo', 'Plugin', 'Community'],
      demoUrl: 'https://youtu.be/J5qKWEgMGl8',
      status: 'video',
    },
  ]);

  projects = this._projects.asReadonly();
}
