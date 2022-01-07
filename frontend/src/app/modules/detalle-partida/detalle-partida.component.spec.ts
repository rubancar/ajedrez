import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePartidaComponent } from './detalle-partida.component';

describe('DetallePartidaComponent', () => {
  let component: DetallePartidaComponent;
  let fixture: ComponentFixture<DetallePartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
