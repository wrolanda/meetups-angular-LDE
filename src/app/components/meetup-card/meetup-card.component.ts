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
  card!: Meetup;

  @Output()
  public addEventCard = new EventEmitter();
  @Output()
  public addEventUnsub = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

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

  subscribeMeetup() { 
    const subscribeMeetupObj = {
      idMeetup: this.card.id,
      idUser:  this.authService.user?.id,
     }
    this.addEventCard.emit(subscribeMeetupObj);
  }

  unsubscribeMeetup() { 
    const subscribeMeetupObj = {
      idMeetup: this.card.id,
      idUser:  this.authService.user?.id,
     }
    this.addEventUnsub.emit(subscribeMeetupObj);
  }
}
