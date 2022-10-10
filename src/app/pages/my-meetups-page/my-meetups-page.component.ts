import { Component, OnInit } from '@angular/core';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';
import { sortList } from 'src/app/shared/interfaces/mathFuncs/mathFuncs';
import { MeetupsPageComponent } from '../meetups-page/meetups-page.component';

@Component({
  selector: 'app-my-meetups-page',
  templateUrl: './my-meetups-page.component.html',
  styleUrls: ['./my-meetups-page.component.scss'],
  providers: [MeetupsService],
})
export class MyMeetupsPageComponent implements OnInit {
  subscription!: Subscription;
  arrayMeetups: Array<Meetup> = [];
  notifier = new Subject<void>();

  constructor(
    private MeetupsService: MeetupsService,
    private authService: AuthService,
    private meetupsPage: MeetupsPageComponent
  ) {}

  ngOnInit(): void {
    this.getMyMeetups();
  }

  getMyMeetups() {
    this.MeetupsService.getSubject()
      .pipe(
        map((data) =>
          data.filter((meetup: Meetup) => meetup.owner.id === this.userId)
        ),
        takeUntil(this.notifier)
      )
      .subscribe((data) => {
        this.arrayMeetups = sortList(data as Array<Meetup>);
      });
  }

  // this.subscription = this.MeetupsService.getSubject().
  //   subscribe(data => {
  //     this.arrayMeetups = this.meetupPage
  //     .sortMeetups(data as Array<Meetup>)
  //     .filter((meetup) => meetup.owner.id === this.userId);
  //   })

  public get userId() {
    const token = this.authService.token;
    if (token) {
      const jwtObj = this.authService.parseJwt(token);
      return jwtObj.id;
    }
    return false;
  }

  delMeetup(id: number) {
    this.meetupsPage.delMeetup(id);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.notifier.next();
    this.notifier.complete();
  }
}
