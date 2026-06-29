import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle } from '../../ui/theme-toggle/theme-toggle';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ThemeToggle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update((v) => !v);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
