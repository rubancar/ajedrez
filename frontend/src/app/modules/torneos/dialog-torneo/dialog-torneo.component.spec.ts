import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTorneoComponent } from './dialog-torneo.component';

describe('DialogTorneoComponent', () => {
  let component: DialogTorneoComponent;
  let fixture: ComponentFixture<DialogTorneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTorneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
