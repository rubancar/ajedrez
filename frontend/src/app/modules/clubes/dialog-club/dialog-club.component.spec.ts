import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClubComponent } from './dialog-club.component';

describe('DialogClubComponent', () => {
  let component: DialogClubComponent;
  let fixture: ComponentFixture<DialogClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
