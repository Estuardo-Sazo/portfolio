import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { SeoService } from '../../core/services/seo';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionTitle, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  private seo = inject(SeoService);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.seo.update({
      title: 'Contacto',
      description:
        '¿Tienes un proyecto en mente o quieres colaborar? Ponte en contacto con Jaime Sazo.',
      path: '/contact',
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;

      const formData = this.contactForm.value;

      this.http.post('https://formspree.io/f/xvzgeryw', formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error al enviar el formulario', error);
          this.isSubmitting = false;
          this.submitError = true;
        },
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
