import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SectionTitle } from '../../shared/ui/section-title/section-title';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionTitle, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
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
