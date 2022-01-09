import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEntrenamientosComponent } from './calendario-entrenamientos.component';

describe('CalendarioEntrenamientosComponent', () => {
  let component: CalendarioEntrenamientosComponent;
  let fixture: ComponentFixture<CalendarioEntrenamientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioEntrenamientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
