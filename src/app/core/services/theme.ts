import { Injectable, signal, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /** Current theme. Dark is the default. */
  readonly theme = signal<Theme>(this.readInitial());

  constructor() {
    // Keep <html> class and localStorage in sync with the signal.
    effect(() => {
      const theme = this.theme();
      if (!this.isBrowser) return;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* ignore */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private readInitial(): Theme {
    if (!this.isBrowser) return 'dark';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
