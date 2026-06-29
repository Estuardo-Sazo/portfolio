import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectsService } from '../../core/services/projects';
import { SeoService } from '../../core/services/seo';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.html',
})
export class ProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private seo = inject(SeoService);
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

    this.seo.update({
      title: this.project.title,
      description: this.project.description,
      image: this.project.gallery?.[0],
      path: `/projects/${this.project.id}`,
      type: 'article',
    });
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
