import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEntrenadorComponent } from './dialog-entrenador.component';

describe('DialogEntrenadorComponent', () => {
  let component: DialogEntrenadorComponent;
  let fixture: ComponentFixture<DialogEntrenadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEntrenadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
