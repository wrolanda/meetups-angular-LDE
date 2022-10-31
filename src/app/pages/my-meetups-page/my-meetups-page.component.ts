import { Component, OnInit } from '@angular/core';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { IMeetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';
import { sortListCompareFn } from 'src/app/shared/mathFuncs/mathFuncs';
import { MeetupsPageComponent } from '../meetups-page/meetups-page.component';

@Component({
  selector: 'app-my-meetups-page',
  templateUrl: './my-meetups-page.component.html',
  styleUrls: ['./my-meetups-page.component.scss'],
  providers: [MeetupsService],
})
export class MyMeetupsPageComponent implements OnInit {
  subscription!: Subscription;
  arrayMeetups: Array<IMeetup> = [];
  notifier = new Subject<void>();

  public get userId() {
    const token = this.authService.token;
    if (token) {
      const jwtObj = this.authService.parseJwt(token);
      return jwtObj.id;
    }
    return false;
  }

  constructor(
    private authService: AuthService,
    private meetupsService: MeetupsService,
    private meetupsPage: MeetupsPageComponent
  ) {}

  ngOnInit(): void {
    this.getMyMeetups();
  }

  getMyMeetups() {
    this.meetupsService
      .getSubject()
      .pipe(
        map((data) =>
          data.filter((meetup: IMeetup) => meetup.owner!.id === this.userId)
        ),
        takeUntil(this.notifier)
      )
      .subscribe((data) => {
        this.arrayMeetups = data.sort(sortListCompareFn);
      });
  }

  delMeetup(id: number) {
    // this.meetupsPage.delMeetup(id);
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
