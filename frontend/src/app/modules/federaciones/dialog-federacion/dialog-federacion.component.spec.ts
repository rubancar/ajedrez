import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFederacionComponent } from './dialog-federacion.component';

describe('DialogFederacionComponent', () => {
  let component: DialogFederacionComponent;
  let fixture: ComponentFixture<DialogFederacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFederacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFederacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
