import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';
import { sortList } from 'src/app/shared/mathFuncs/mathFuncs';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
  providers: [MeetupsService],
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
      this.arrayMeetups = sortList(data as Array<Meetup>);
    });
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
  }
}
