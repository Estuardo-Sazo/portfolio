import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologyCard } from './tecnology-card';

describe('TecnologyCard', () => {
  let component: TecnologyCard;
  let fixture: ComponentFixture<TecnologyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnologyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnologyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
