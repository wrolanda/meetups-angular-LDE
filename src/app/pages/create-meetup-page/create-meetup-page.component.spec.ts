import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetupPageComponent } from './create-meetup-page.component';

describe('CreateMeetupPageComponent', () => {
  let component: CreateMeetupPageComponent;
  let fixture: ComponentFixture<CreateMeetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeetupPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMeetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
