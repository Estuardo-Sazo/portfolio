import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ProjectsService } from '../../core/services/projects';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.html',
})
export class ProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private sanitizer = inject(DomSanitizer);
  public location = inject(Location);

  project?: Project;
  safeVideoUrls: SafeResourceUrl[] = [];

  // Lightbox State
  selectedImageIndex: number = -1;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.project = this.projectsService.getProjectById(id);

        if (this.project) {
          this.updateMetaTags();
          this.sanitizeVideoUrls();
        } else {
          this.router.navigate(['/404']);
        }
      }
    });
  }

  updateMetaTags() {
    if (!this.project) return;

    this.titleService.setTitle(`${this.project.title} | Jaime Sazo`);
    this.metaService.updateTag({ name: 'description', content: this.project.description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: this.project.title });
    this.metaService.updateTag({ property: 'og:description', content: this.project.description });
    // this.metaService.updateTag({ property: 'og:image', content: this.project.coverImage }); // Assuming coverImage exists or use a default
  }

  sanitizeVideoUrls() {
    if (this.project?.videos) {
      this.safeVideoUrls = this.project.videos.map((url) =>
        this.sanitizer.bypassSecurityTrustResourceUrl(url)
      );
    }
  }

  goBack() {
    this.location.back();
  }

  // Lightbox Methods
  openLightbox(index: number) {
    this.selectedImageIndex = index;
    document.body.style.overflow = 'hidden'; // Disable scroll
  }

  closeLightbox() {
    this.selectedImageIndex = -1;
    document.body.style.overflow = ''; // Enable scroll
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
