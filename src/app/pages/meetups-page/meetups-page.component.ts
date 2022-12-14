import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';
import { indicate } from 'src/app/shared/loadingFunctions/loading';
import { sortListCompareFn } from 'src/app/shared/mathFuncs/mathFuncs';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
  providers: [MeetupsService],
})
export class MeetupsPageComponent implements OnInit, OnDestroy {
  notifier = new Subject<void>();
  loading2$ = new Subject<boolean>();

  arrayMeetups: Array<Meetup> = [];
  subscription!: Subscription;

  constructor(public meetupsService: MeetupsService) {}

  ngOnInit(): void {
    this.getMeetups();
  }

  getMeetups() {
    this.subscription = this.meetupsService
      .getSubject()
      .pipe(indicate(this.loading2$), takeUntil(this.notifier))
      .subscribe((data: Array<Meetup>) => {
        this.arrayMeetups = data.sort(sortListCompareFn);
      });
  }

  subscribeMeetup(subscribeMeetupObj: { idMeetup: number; idUser: number }) {
    this.subscription = this.meetupsService
      .subscribeMeetup(subscribeMeetupObj.idMeetup, subscribeMeetupObj.idUser)
      .subscribe((result) => {
        this.meetupsService.refreshMeetups();
        console.log(result);
      });
  }

  unsubscribeMeetup(subscribeMeetupObj: { idMeetup: number; idUser: number }) {
    this.subscription = this.meetupsService
      .unsubscribeMeetup(subscribeMeetupObj.idMeetup, subscribeMeetupObj.idUser)
      .subscribe((result) => {
        this.meetupsService.refreshMeetups();
        console.log(result);
      });
  }

  delMeetup(id: number) {
    this.subscription = this.meetupsService
      .delMeetup(id)
      .subscribe((result) => {
        this.meetupsService.refreshMeetups();
        console.log(result);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.notifier.next();
    this.notifier.complete();
  }
}
