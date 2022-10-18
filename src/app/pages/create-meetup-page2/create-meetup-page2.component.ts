import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MeetupCreate } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-create-meetup-page2',
  templateUrl: './create-meetup-page2.component.html',
  styleUrls: ['./create-meetup-page2.component.scss'],
  providers: [MeetupsService],
})
export class CreateMeetupPage2Component implements OnInit, OnDestroy {
  private notifier = new Subject<void>;

  constructor(private meetupsService: MeetupsService) { }

  ngOnInit(): void {
  }

  createMeetup(meetup: MeetupCreate) {
    this.meetupsService.createMeetup(meetup).pipe(
      takeUntil(this.notifier),
    ).subscribe(() => this.meetupsService.refreshMeetups());
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
