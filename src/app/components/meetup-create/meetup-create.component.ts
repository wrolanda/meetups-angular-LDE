import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  durationCalculation,
  getDateString,
  getEndTime,
  getISODate,
  getTimeString,
} from 'src/app/shared/formateDate/formatDate';

@Component({
  selector: 'app-meetup-create',
  templateUrl: './meetup-create.component.html',
  styleUrls: ['./meetup-create.component.scss'],
})
export class MeetupCreateComponent implements OnInit {
  @Output()
  public editMeetupEvent = new EventEmitter();
  @Output()
  public addMeetupEvent = new EventEmitter();

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
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.InitCreateMeetupForm();
  }

  InitCreateMeetupForm() {
    this.MeetupCreateReactiveForm = this.fb.group({
      name: ['название', Validators.required],
      description: ['описание', Validators.required],
      location: ['переговорка 20', Validators.required],
      target_audience: [
        'хорошие ребята а так же их родители',
        Validators.required,
      ],
      need_to_know: ['нужно знать', Validators.required],
      will_happen: ['что-то произойдет', Validators.required],
      reason_to_come: ['причина жить', Validators.required],
      startTime: [`${getTimeString('')}`, Validators.required],
      endTime: [
        `${getEndTime(getTimeString(''), getDateString(''), 60)}`,
        Validators.required,
      ],
      date: [`${getDateString('')}`, Validators.required],
    });
  }

  get requredForm() {
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
      return true;
    } else {
      return false;
    }
  }

  createObj() {
    const duration = durationCalculation(
      this.MeetupCreateReactiveForm.value.date!,
      this.MeetupCreateReactiveForm.value.startTime!,
      this.MeetupCreateReactiveForm.value.endTime!
    );

    const meetupObj = {
      //id: this.card?.id,
      name: this.MeetupCreateReactiveForm.value.name!,
      description: this.MeetupCreateReactiveForm.value.description!,
      location: this.MeetupCreateReactiveForm.value.location!,
      time: getISODate(
        this.MeetupCreateReactiveForm.value.date!,
        this.MeetupCreateReactiveForm.value.startTime!
      ),
      duration: duration,
      target_audience: this.MeetupCreateReactiveForm.value.target_audience!,
      need_to_know: this.MeetupCreateReactiveForm.value.need_to_know!,
      will_happen: this.MeetupCreateReactiveForm.value.will_happen!,
      reason_to_come: this.MeetupCreateReactiveForm.value.reason_to_come!,
    };
    return meetupObj;
  }

  onCreateMeetup() {
    this.addMeetupEvent.emit(this.createObj());
  }

  onEditMeetup() {
    this.editMeetupEvent.emit(this.createObj());
  }
}
