import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadoresComponent } from './entrenadores.component';

describe('EntrenadoresComponent', () => {
  let component: EntrenadoresComponent;
  let fixture: ComponentFixture<EntrenadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrenadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
