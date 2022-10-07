import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';
import { MeetupsPageComponent } from '../meetups-page/meetups-page.component';

@Component({
  selector: 'app-my-meetups-page',
  templateUrl: './my-meetups-page.component.html',
  styleUrls: ['./my-meetups-page.component.scss'],
})
export class MyMeetupsPageComponent implements OnInit {

  subscription!: Subscription;
  arrayMeetups: Array<Meetup> = [];
  constructor(
    private MeetupsService: MeetupsService,
    private authService: AuthService,
    private meetupPage: MeetupsPageComponent
    ) 
    {}

  ngOnInit(): void {
    /*this.subscription = this.MeetupsService.getMeetups().
    subscribe(data => {
      this.arrayMeetups = this.meetupPage
      .sortMeetups(data as Array<Meetup>)
      .filter((meetup) => meetup.owner.id === this.userId);
    })*/
  }

  public get userId() {
    const token = this.authService.token;
    if (token) {
      const jwtObj = this.authService.parseJwt(token);
      return jwtObj.id;
    }
  return false;
  }

  delMeetup(id: number) {
    this.meetupPage.delMeetup(id);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

}
}
