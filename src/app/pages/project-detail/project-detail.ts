import { Component, HostListener, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectsService } from '../../core/services/projects';
import { SeoService } from '../../core/services/seo';
import { Project, PROJECT_STATUS_META } from '../../core/models/project.model';
import { RevealDirective } from '../../shared/directives/reveal';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './project-detail.html',
})
export class ProjectDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private seo = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly statusMeta = PROJECT_STATUS_META;

  project?: Project;
  paragraphs: string[] = [];
  safeVideoUrls: SafeResourceUrl[] = [];
  prevProject?: Project;
  nextProject?: Project;

  // Lightbox State
  selectedImageIndex: number = -1;

  get isMobileGallery(): boolean {
    return this.project?.galleryLayout === 'mobile';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.project = this.projectsService.getProjectById(id);

        if (this.project) {
          this.closeLightbox();
          this.updateMetaTags();
          this.sanitizeVideoUrls();
          this.paragraphs = this.toParagraphs(this.project.fullDescription);
          this.setSiblings(this.project);
        } else {
          this.router.navigate(['/404']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.closeLightbox();
  }

  updateMetaTags() {
    if (!this.project) return;

    this.seo.update({
      title: this.project.title,
      description: this.project.description,
      image: this.project.gallery?.[0],
      path: `/projects/${this.project.id}`,
      type: 'article',
    });
  }

  sanitizeVideoUrls() {
    this.safeVideoUrls = (this.project?.videos ?? []).map((url) =>
      this.sanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }

  /** Blank lines separate paragraphs; single line breaks are just source formatting. */
  private toParagraphs(text?: string): string[] {
    if (!text) return [];
    return text
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  }

  private setSiblings(current: Project) {
    const all = this.projectsService.projects();
    const i = all.findIndex((p) => p.id === current.id);
    this.prevProject = all[(i - 1 + all.length) % all.length];
    this.nextProject = all[(i + 1) % all.length];
  }

  // Lightbox Methods
  openLightbox(index: number) {
    this.selectedImageIndex = index;
    if (this.isBrowser) document.body.style.overflow = 'hidden'; // Disable scroll
  }

  closeLightbox() {
    this.selectedImageIndex = -1;
    if (this.isBrowser) document.body.style.overflow = ''; // Enable scroll
  }

  nextImage(event?: Event) {
    event?.stopPropagation();
    if (this.project?.gallery) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.project.gallery.length;
    }
  }

  prevImage(event?: Event) {
    event?.stopPropagation();
    if (this.project?.gallery) {
      this.selectedImageIndex =
        (this.selectedImageIndex - 1 + this.project.gallery.length) % this.project.gallery.length;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedImageIndex === -1) return;

    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }
}
