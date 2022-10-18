import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetupPageComponent } from './edit-meetup-page.component';

describe('EditMeetupPageComponent', () => {
  let component: EditMeetupPageComponent;
  let fixture: ComponentFixture<EditMeetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeetupPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMeetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
