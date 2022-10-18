import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetupPage2Component } from './create-meetup-page2.component';

describe('CreateMeetupPage2Component', () => {
  let component: CreateMeetupPage2Component;
  let fixture: ComponentFixture<CreateMeetupPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeetupPage2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMeetupPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
