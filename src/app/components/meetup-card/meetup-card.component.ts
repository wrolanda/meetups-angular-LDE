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
      data: {
        name: this.card.name,
        description: this.card.description,
        location: this.card.location,
        target_audience: this.card.target_audience,
        need_to_know: this.card.need_to_know,
        will_happen: this.card.will_happen,
        reason_to_come: this.card.reason_to_come,
        startTime: getTimeString(this.card.time),
        endTime: getEndTime(
              getTimeString(this.card.time),
              getDateString(this.card.time),
              this.card.duration),
        date: getDateString(this.card.time),
      }
    });
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

  editMeetup(card: Meetup) {

  }
}
