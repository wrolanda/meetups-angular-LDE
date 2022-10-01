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
  public name: string = 'название';
  public description: string = 'описание';
  public location: string = 'переговорка 20';
  public target_audience: string = 'клоуны';
  public need_to_know: string = 'нужно знать';
  public will_happen: string = 'что-то произойдет';
  public reason_to_come: string = 'причина жить';
  public startTime: string = '17:00';
  public endTime: string = '18:00';
  public date: string = "2022-09-30";
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
      this.startTime &&
      this.endTime &&
      this.date &&
      this.location &&
      this.target_audience &&
      this.need_to_know &&
      this.will_happen &&
      this.reason_to_come
    ) {
      const durat = this.durationCalculation(
        this.date + " " + this.startTime, 
        this.date + " " + this.endTime);
      const meetupObj = new Meetup(
        Date.now(),
        this.name,
        this.description,
        this.location,
        this.target_audience,
        this.need_to_know,
        this.will_happen,
        this.reason_to_come,
        this.date + " " + this.startTime,
        durat,
        this.authService.user!.id,
        this.authService.user!,
        []
      );
      this.addEvent.emit(meetupObj);
    } else {
      alert('заполните пожалуйста все поля');
    }
  }

  durationCalculation(date1: string, date2: string): number {
    return (Date.parse(date2) - Date.parse(date1)) / 1000 / 60;
  }
}
