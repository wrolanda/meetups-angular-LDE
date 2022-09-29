import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(
    public MeetupsService: MeetupsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.MeetupsService.getMeetups().subscribe(data => this.arrayMeetups = data as Array<Meetup>)
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log("destroy");
    }
  }
}
