import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Adds a fade-up reveal as the element scrolls into view.
 * Usage: <div appReveal [revealDelay]="100">...</div>
 * SSR-safe: on the server (and without IntersectionObserver) content shows immediately.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit {
  @Input() revealDelay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;

    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return; // Render visible by default (no `reveal` class added).
    }

    this.renderer.addClass(node, 'reveal');
    if (this.revealDelay) {
      this.renderer.setStyle(node, 'transition-delay', `${this.revealDelay}ms`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(node, 'is-visible');
            observer.unobserve(node);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
  }
}
