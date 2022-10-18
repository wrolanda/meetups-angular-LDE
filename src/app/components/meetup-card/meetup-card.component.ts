import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meetup } from 'src/app/entities/meetup';
import { EditMeetupPageComponent } from 'src/app/pages/edit-meetup-page/edit-meetup-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss'],
})
export class MeetupCardComponent implements OnInit {
  get actualMeetups() {
    if (new Date(this.card.time) < new Date()) {
      return false;
    } else return true;
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

  @Input() isMore = false;
  @Input() card!: Meetup;

  @Output()
  public addEventCard = new EventEmitter();
  @Output()
  public addEventUnsub = new EventEmitter();
  @Output()
  public addEventDel = new EventEmitter();

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private meetupService: MeetupsService
  ) {}

  ngOnInit(): void {}

  isMoreToogle() {
    this.isMore = !this.isMore;
  }

  openDialog(): void {
    const editMeetupdialogRef = this.dialog
      .open(EditMeetupPageComponent, {
        width: '350px',
        data: this.card,
      })
      .afterClosed()
      .subscribe(() => this.meetupService.refreshMeetups());
  }

  subscribeMeetup() {
    const subscribeMeetupObj = {
      idMeetup: this.card.id,
      idUser: this.authService.user?.id,
    };
    this.addEventCard.emit(subscribeMeetupObj);
  }

  unsubscribeMeetup() {
    const subscribeMeetupObj = {
      idMeetup: this.card.id,
      idUser: this.authService.user?.id,
    };
    this.addEventUnsub.emit(subscribeMeetupObj);
  }

  delMeetup() {
    const result = confirm('вы уверены?');
    if (result) {
      this.addEventDel.emit(this.card.id);
    }
  }
}
