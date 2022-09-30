import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsComponent } from '../meetups/meetups.component';

@Component({
  selector: 'app-meetup-create',
  templateUrl: './meetup-create.component.html',
  styleUrls: ['./meetup-create.component.scss'],
})
export class MeetupCreateComponent implements OnInit {
  public name: string = '';
  public description: string = '';
  public location: string = '';
  public target_audience: string = '';
  public need_to_know: string = '';
  public will_happen: string = '';
  public reason_to_come: string = '';
  public time: any;
  public date: any;
  public duration: number = 0;
  public owner!: User;

  constructor(private authService: AuthService) {}

  @Output()
  public addEvent = new EventEmitter();

  ngOnInit(): void {}

  onCreateMeetup() {
    if (
      this.name &&
      this.description &&
      this.time &&
      this.date &&
      this.duration &&
      this.location &&
      this.target_audience &&
      this.need_to_know &&
      this.will_happen &&
      this.reason_to_come
    ) {
      const meetupObj = new Meetup(
        Date.now(),
        this.name,
        this.description,
        this.location,
        this.target_audience,
        this.need_to_know,
        this.will_happen,
        this.reason_to_come,
        this.time,
        this.duration,
        this.authService.user!.id,
        this.authService.user!,
        []
      );
      // this.addEvent.emit(meetupObj);
      console.log(meetupObj);
    } else {
      alert('заполните пожалуйста все поля');
    }
  }
}
