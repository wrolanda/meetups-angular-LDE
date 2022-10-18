import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MeetupEdit } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-edit-meetup-page',
  templateUrl: './edit-meetup-page.component.html',
  styleUrls: ['./edit-meetup-page.component.scss'],
  providers: [MeetupsService],
})
export class EditMeetupPageComponent implements OnInit, OnDestroy {

  private notifier = new Subject<void>;

  constructor(private meetupsService: MeetupsService) { }

  ngOnInit(): void {
  }

  onEditMeetup(meetup: MeetupEdit) {
    this.meetupsService.editMeetup(meetup).pipe(
      takeUntil(this.notifier),
    ).subscribe((result) => {
            this.meetupsService.refreshMeetups();
            console.log(result);
          });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
