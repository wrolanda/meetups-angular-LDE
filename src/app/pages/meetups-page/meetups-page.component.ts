import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
})
export class MeetupsPageComponent implements OnInit, OnDestroy {
  arrayMeetups: Array<Meetup> = [];
  subscription!: Subscription;
  notifier = new Subject<void>();

  constructor(private MeetupsService: MeetupsService) {}

  ngOnInit(): void {
    this.getMeetups();
  }

  getMeetups() {
    this.subscription = this.MeetupsService.getSubject().pipe(
      takeUntil(this.notifier),
      tap(() => console.log('aaaaaaaa'))
    ).subscribe((data) => {
      this.arrayMeetups = this.sortMeetups(data as Array<Meetup>);
    });
  }

  sortMeetups(data: Array<Meetup>) {
    return [...data].sort(
      (meetup1, meetup2) =>
        Date.parse(meetup2.createdAt) - Date.parse(meetup1.createdAt)
    );
  }

  subscribeMeetup(subscribeMeetupObj: { idMeetup: number; idUser: number }) {
    this.subscription = this.MeetupsService.subscribeMeetup(
      subscribeMeetupObj.idMeetup,
      subscribeMeetupObj.idUser
    ).subscribe(console.log);
  }

  unsubscribeMeetup(subscribeMeetupObj: { idMeetup: number; idUser: number }) {
    this.subscription = this.MeetupsService.unsubscribeMeetup(
      subscribeMeetupObj.idMeetup,
      subscribeMeetupObj.idUser
    ).subscribe(console.log);
  }

  delMeetup(id: number) {
    this.subscription = this.MeetupsService.delMeetup(id).subscribe(
      console.log
    );
  }

  ngOnChanges() {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.notifier.next();
    this.notifier.complete();
    this.MeetupsService.ngOnDestroy();
  }
}
