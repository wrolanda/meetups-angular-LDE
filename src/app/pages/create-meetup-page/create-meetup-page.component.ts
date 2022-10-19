import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MeetupCreate } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-create-meetup-page',
  templateUrl: './create-meetup-page.component.html',
  styleUrls: ['./create-meetup-page.component.scss'],
  providers: [MeetupsService],
})
export class CreateMeetupPageComponent implements OnInit, OnDestroy {

  private notifier = new Subject<void>;
  
  constructor(private meetupsService: MeetupsService) {}

  ngOnInit(): void {}

  createMeetup(meetupForm: MeetupCreate) {
    this.meetupsService.createMeetup(meetupForm).pipe(
      takeUntil(this.notifier),
      ).subscribe(() => {this.meetupsService.refreshMeetups()});
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
