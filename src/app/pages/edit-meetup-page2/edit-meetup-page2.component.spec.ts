import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetupPage2Component } from './edit-meetup-page2.component';

describe('EditMeetupPage2Component', () => {
  let component: EditMeetupPage2Component;
  let fixture: ComponentFixture<EditMeetupPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeetupPage2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMeetupPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
