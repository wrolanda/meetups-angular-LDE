import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss']
})
export class MeetupCardComponent implements OnInit {

  @Input()
  isMore = false;

  @Input()
  card!: Meetup;

  @Output()
  public addEventCard = new EventEmitter();
  @Output()
  public addEventUnsub = new EventEmitter();
  @Output()
  public addEventDel = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  isMoreToogle() {
    this.isMore = !this.isMore;
  }

  get isOwnMeetup() {
    return this.authService.user?.id === this.card.owner.id;
  }

  get isSub() {
    for (let i = 0; i < this.card.users.length; i++) {
      if (this.card.users[i].id === this.authService.user?.id) {
        return true;
      }
    }
    return false;
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  subscribeMeetup() { 
    const subscribeMeetupObj = {
      idMeetup: this.card.id,
      idUser:  this.authService.user?.id,
     }
    // // метод где мы меняем только ту карту, в которой поменяли данные
    // this.meetupsService.subscribeMeetup(subscribeMeetupObj.idMeetup, subscribeMeetupObj.idUser).subscribe((data) => {
    //   this.card.users = data.users;
    // })
    this.addEventCard.emit(subscribeMeetupObj);
  }

  unsubscribeMeetup() { 
    const subscribeMeetupObj = {
      idMeetup: this.card.id,
      idUser:  this.authService.user?.id,
     }
    this.addEventUnsub.emit(subscribeMeetupObj);
  }

  delMeetup() {
    this.addEventDel.emit(this.card.id);
  }
}
