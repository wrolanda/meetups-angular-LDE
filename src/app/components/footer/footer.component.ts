import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMeetupPageComponent } from 'src/app/pages/create-meetup-page/create-meetup-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [MeetupsService],
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService,
    private meetupsService: MeetupsService,
    public dialog: MatDialog) { }

  public get isAuth() {
    return this.authService.token;
  }

  public get isAdmin() {
    return this.authService.isAdmin;
  }

  ngOnInit(): void {}

  openDialog(): void {
    const editMeetupdialogRef = this.dialog
      .open(CreateMeetupPageComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe(() => this.meetupsService.refreshMeetups());
  }
}
