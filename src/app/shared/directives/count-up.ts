import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Animates a number from 0 up to the target value when the element scrolls into view.
 * Usage: <span [appCountUp]="42" [countUpDuration]="1500"></span>
 * SSR-safe: on the server (or with reduced motion) the final value renders immediately.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnChanges, OnDestroy {
  @Input({ required: true }) appCountUp = 0;
  @Input() countUpDuration = 1500;

  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private frame?: number;
  private hasAnimated = false;

  ngOnChanges(): void {
    const node = this.el.nativeElement as HTMLElement;

    if (
      !isPlatformBrowser(this.platformId) ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      this.hasAnimated
    ) {
      this.render(this.appCountUp);
      return;
    }

    this.render(0);
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.observer?.disconnect();
          this.animate();
        }
      },
      { threshold: 0.5 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  private animate(): void {
    this.hasAnimated = true;
    const target = this.appCountUp;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / this.countUpDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      this.render(Math.round(target * eased));
      if (t < 1) this.frame = requestAnimationFrame(step);
    };

    this.frame = requestAnimationFrame(step);
  }

  private render(value: number): void {
    (this.el.nativeElement as HTMLElement).textContent = String(value);
  }
}
