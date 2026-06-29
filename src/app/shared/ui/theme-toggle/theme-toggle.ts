import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="theme.toggle()"
      class="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:text-ink hover:border-brand/40"
      [attr.aria-label]="theme.theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
      title="Cambiar tema"
    >
      @if (theme.theme() === 'dark') {
      <!-- Sun -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      } @else {
      <!-- Moon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      }
    </button>
  `,
})
export class ThemeToggle {
  theme = inject(ThemeService);
}
