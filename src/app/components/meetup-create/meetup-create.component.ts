import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-meetup-create',
  templateUrl: './meetup-create.component.html',
  styleUrls: ['./meetup-create.component.scss'],
})
export class MeetupCreateComponent implements OnInit {
  MeetupCreateReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    location: FormControl<string | null>;
    target_audience: FormControl<string | null>;
    need_to_know: FormControl<string | null>;
    will_happen: FormControl<string | null>;
    reason_to_come: FormControl<string | null>;
    startTime: FormControl<string | null>;
    endTime: FormControl<string | null>;
    date: FormControl<string | null>;
    duration: FormControl<number | null>;
  }>;

  // public name: string = 'название';
  // public description: string = 'описание';
  // public location: string = 'переговорка 20';
  // public target_audience: string = 'клоуны';
  // public need_to_know: string = 'нужно знать';
  // public will_happen: string = 'что-то произойдет';
  // public reason_to_come: string = 'причина жить';
  // public startTime: string = '17:00';
  // public endTime: string = '18:00';
  // public date: string = "2022-09-30";
  // public duration: number = 0;
  // public owner!: User;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private meetupsService: MeetupsService,
    ) {}

  @Output()
  public addEvent = new EventEmitter();

  ngOnInit(): void {
    this.InitCreateMeetupForm();
    console.log(this.meetupsService.nameUniqueValid("название"));
  }

  InitCreateMeetupForm() {
    this.MeetupCreateReactiveForm = this.fb.group({
      name: ['название'],
      description: ['описание'],
      location: ['переговорка 20'],
      target_audience: ['клоуны'],
      need_to_know: ['нужно знать'],
      will_happen: ['что-то произойдет'],
      reason_to_come: ['причина жить'],
      startTime: ['17:00'],
      endTime: ['18:00'],
      date: ['2022-10-05'],
      duration: [0],
    });
  }

  onCreateMeetup2() {
    if (
      this.MeetupCreateReactiveForm.value.name &&
      this.MeetupCreateReactiveForm.value.description &&
      this.MeetupCreateReactiveForm.value.startTime &&
      this.MeetupCreateReactiveForm.value.endTime &&
      this.MeetupCreateReactiveForm.value.date &&
      this.MeetupCreateReactiveForm.value.location &&
      this.MeetupCreateReactiveForm.value.target_audience &&
      this.MeetupCreateReactiveForm.value.need_to_know &&
      this.MeetupCreateReactiveForm.value.will_happen &&
      this.MeetupCreateReactiveForm.value.reason_to_come
    ) {
        const duration = this.durationCalculation(
          this.MeetupCreateReactiveForm.value.date
          + ' ' 
          + this.MeetupCreateReactiveForm.value.startTime,
          this.MeetupCreateReactiveForm.value.date 
          + ' ' 
          + this.MeetupCreateReactiveForm.value.endTime)
        const meetupObj = new Meetup(
          Date.now(),
          this.MeetupCreateReactiveForm.value.name,
          this.MeetupCreateReactiveForm.value.description,
          this.MeetupCreateReactiveForm.value.location,
          this.MeetupCreateReactiveForm.value.target_audience,
          this.MeetupCreateReactiveForm.value.need_to_know,
          this.MeetupCreateReactiveForm.value.will_happen,
          this.MeetupCreateReactiveForm.value.reason_to_come,
          this.MeetupCreateReactiveForm.value.date 
          + ' ' 
          + this.MeetupCreateReactiveForm.value.startTime,
          duration,
          this.authService.user!.id,
          this.authService.user!,
        []
        );
        this.addEvent.emit(meetupObj);
    } else {
      alert("заполните все поля");
    }
  }

  durationCalculation(date1: string, date2: string): number {
    return (Date.parse(date2) - Date.parse(date1)) / 1000 / 60;
  }
}
