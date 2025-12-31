import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'mi-flota-app',
    title: 'App web PWA Mi Flota',
    description:
      'App web PWA para la gestión de vehiculos, registrar gastos e ingresos, y generar reportes.',
    fullDescription: `
        Una aplicación progresiva (PWA) diseñada para simplificar la administración de flotas vehiculares. 
        Permite a los usuarios llevar un control detallado de los gastos (combustible, mantenimiento), ingresos y calcular la rentabilidad de cada unidad.
        
        Funciona completamente offline gracias a Dexie.js y sincroniza los datos cuando recupera la conexión. Ideal para taxistas, Uber, o pequeñas empresas de transporte.
      `,
    technologies: ['Angular', 'Dexie.js', 'Git'],
    demoUrl: 'https://estuardo-sazo.github.io/mi-flota-app/',
    status: 'production',
    featured: false,
    gallery: [
      '/images/miflota/image01.png',
      '/images/miflota/image02.png',
      '/images/miflota/image03.png',
    ],
  },
  {
    id: 'docualchilazo',
    title: 'DocuAlChilazo',
    description: 'Genera cartas, solicitudes, contratos y más con un editor visual tipo Canva.',
    fullDescription: `
        Ahorra tiempo, mantiene formato perfecto y descarga en PDF listo para usar.
        
       En DocuAlChilazo, hemos simplificado el proceso de creación de documentos legales y profesionales. Olvídate de los complicados programas de edición y de buscar plantillas desactualizadas. 
       Sigue los sencillos pasos y tendrás tu documento listo en minutos.
      `,
    technologies: ['Astro', 'React', 'Vercel', 'Tailwind', 'Supabase'],
    demoUrl: 'https://www.docalchilazo.site/',
    status: 'production',
    gallery: [
      '/images/docalchilazo/image01.png',
      '/images/docalchilazo/image02.png',
      '/images/docalchilazo/image03.png',
    ],
  },
  {
    id: 'odoo-facturacion-electronica',
    title: 'Plugin para Odoo (Facturación Electrónica) con Factus',
    description: 'Plugin para Odoo que permite facturar electrónica con Factus.',
    fullDescription: `
        Módulo personalizado para Odoo 17 Community ERP que integra la facturación electrónica de Colombia a través de Factus.
        Automatiza la emisión de facturas, notas de crédito y débito directamente desde el punto de venta o el módulo de contabilidad de Odoo.
      `,
    technologies: ['Python', 'Odoo', 'ApiRest', 'Factus'],
    demoUrl: 'https://www.youtube.com/watch?v=3fVen8smOqc',
    status: 'video',
    videos: ['https://www.youtube.com/embed/3fVen8smOqc'],
  },
  {
    id: 'odoo-alquiler-vehiculos',
    title: 'Plugin básico para Odoo Alquiler de vehículos',
    description: 'Plugin para Odoo 17 que permite alquilar vehículos.',
    technologies: ['Python', 'Odoo', 'Plugin', 'Community'],
    demoUrl: 'https://youtu.be/deDoevPV_jg',
    status: 'video',
    videos: ['https://www.youtube.com/embed/deDoevPV_jg'],
  },
  {
    id: 'odoo-ventas-negativas',
    title: 'Módulo para Bloquear Ventas Negativas en Odoo',
    description: 'Módulo para Odoo 15 que permite bloquear ventas negativas.',
    technologies: ['Python', 'Odoo', 'Plugin', 'Community'],
    demoUrl: 'https://youtu.be/J5qKWEgMGl8',
    status: 'video',
    videos: ['https://www.youtube.com/embed/J5qKWEgMGl8'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private _projects = signal<Project[]>(PROJECTS_DATA);

  projects = this._projects.asReadonly();

  getProjectById(id: string) {
    return this.projects().find((p) => p.id === id);
  }
}
