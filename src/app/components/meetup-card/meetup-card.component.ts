import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { getDateString, getEndTime, getTimeString } from 'src/app/shared/formateDate/formatDate';
import { EditMeetupComponent } from '../edit-meetup/edit-meetup.component';

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

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {}

  isMoreToogle() {
    this.isMore = !this.isMore;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditMeetupComponent, {
      width: '350px',
      data: this.card,
  })
};

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
    const result = confirm("вы уверены?");
    if (result) {
      this.addEventDel.emit(this.card.id);
    }
  }

  editMeetup(card: Meetup) {

  }
}
