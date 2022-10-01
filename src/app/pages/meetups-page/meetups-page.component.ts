import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throwIfEmpty } from 'rxjs';
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
    this.subscription = this.MeetupsService.getMeetups().
    subscribe(data => {
      let sortData = data as Array<Meetup>;
      sortData = sortData.sort((meetup1, meetup2) => 
      Date.parse(meetup2.createdAt) - Date.parse(meetup1.createdAt));
      console.log(sortData);
      this.arrayMeetups = sortData;
    })
  }

  subscribeMeetup(subscribeMeetupObj: {idMeetup: number, idUser: number}) {
    this.subscription = this.MeetupsService.subscribeMeetup
    (subscribeMeetupObj.idMeetup, subscribeMeetupObj.idUser)
    .subscribe(console.log);
  }

  unsubscribeMeetup(subscribeMeetupObj: {idMeetup: number, idUser: number}) {
    this.subscription = this.MeetupsService.unsubscribeMeetup
    (subscribeMeetupObj.idMeetup, subscribeMeetupObj.idUser)
    .subscribe(console.log);
  }

  delMeetup(id: number) {
    this.subscription = this.MeetupsService.delMeetup(id).subscribe(console.log);
  }
  
  ngOnChanges() {
    
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
