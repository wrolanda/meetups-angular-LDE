import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-my-meetups-page',
  templateUrl: './my-meetups-page.component.html',
  styleUrls: ['./my-meetups-page.component.scss'],
})
export class MyMeetupsPageComponent implements OnInit {

  arrayMeetups: Array<Meetup> = [];
  constructor(public MeetupsService: MeetupsService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.MeetupsService.getMeetups().subscribe((data) => {
      this.arrayMeetups = data as Array<Meetup>;
      console.log(this.arrayMeetups);
      
    })
  }

  public get meetupsFilter() {
    return this.arrayMeetups.filter(
      (meetup) => meetup.owner.id === this.userId);
  }

  public get userId() {
    const token = this.authService.token;
    if (token) {
      const jwtObj = this.authService.parseJwt(token);
      console.log(jwtObj.id)
      return jwtObj.id;
    }
  return false;
  }
}
