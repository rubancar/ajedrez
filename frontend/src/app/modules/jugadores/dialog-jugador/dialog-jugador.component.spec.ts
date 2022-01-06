import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJugadorComponent } from './dialog-jugador.component';

describe('DialogJugadorComponent', () => {
  let component: DialogJugadorComponent;
  let fixture: ComponentFixture<DialogJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
