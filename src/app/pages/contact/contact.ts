import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitle } from '../../shared/ui/section-title/section-title';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionTitle],
  templateUrl: './contact.html',
})
export class Contact {
  onSubmit(event: Event) {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! (Funcionalidad demo)');
  }
}
