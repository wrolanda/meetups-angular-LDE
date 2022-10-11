import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-create-meetup-page',
  templateUrl: './create-meetup-page.component.html',
  styleUrls: ['./create-meetup-page.component.scss'],
  providers: [MeetupsService],
})
export class CreateMeetupPageComponent implements OnInit {

  subscription!: Subscription;

  constructor(private meetupsService: MeetupsService) { }

  ngOnInit(): void {
  }

  createMeetup(meetupForm: Meetup) {
    this.subscription = this.meetupsService.createMeetup(
      meetupForm.name, 
      meetupForm.description,
      meetupForm.time,
      meetupForm.duration,
      meetupForm.location,
      meetupForm.target_audience,
      meetupForm.need_to_know,
      meetupForm.will_happen,
      meetupForm.reason_to_come
    ).subscribe(() => this.meetupsService.refreshMeetups())
  }

  ngOnDestroy() {
    this.subscription?.remove;
  }
}
