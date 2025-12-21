import { Component, inject, input } from '@angular/core';
import { Tecnology } from '../../../core/models/tecnology.model';

@Component({
  selector: 'app-tecnology-card',
  imports: [],
  templateUrl: './tecnology-card.html',
  styleUrl: './tecnology-card.css',
})
export class TecnologyCard {
  tecnology = input<Tecnology>();
}
