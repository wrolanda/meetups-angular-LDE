import { Component, Inject, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meetup } from 'src/app/entities/meetup';
import {
  durationCalculation,
  getDateString,
  getEndTime,
  getISODate,
  getTimeString,
} from 'src/app/shared/formateDate/formatDate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-meetup',
  templateUrl: './edit-meetup.component.html',
  styleUrls: ['./edit-meetup.component.scss'],
})
export class EditMeetupComponent implements OnInit {
  MeetupEditReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    location: FormControl<string | null>;
    target_audience: FormControl<string | null>;
    need_to_know: FormControl<string | null>;
    will_happen: FormControl<string | null>;
    reason_to_come: FormControl<string | null>;
    startTime: FormControl<string | null>;
    endTime: FormControl<string | null>;
    date: FormControl<string | null>; // "2022-11-11T00:00:00.000Z"
  }>;

  @Output()
  editMeetupEvent = new EventEmitter();

  @Output()
  public addMeetupEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public EditMeetupdialogRef: MatDialogRef<EditMeetupComponent>,
    @Inject(MAT_DIALOG_DATA) public card: Meetup
  ) {}

  onNoClick(): void {
    this.EditMeetupdialogRef.close();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.MeetupEditReactiveForm = this.fb.group({
      name: [this.card ? this.card.name : 'название', Validators.required],
      description: [this.card.description || 'описание1', Validators.required],
      startTime: [
        getTimeString(this.card.time) || getTimeString(''),
        Validators.required,
      ],
      endTime: [
        getEndTime(
          getTimeString(this.card.time),
          getDateString(this.card.time),
          this.card.duration
        ) || getEndTime(getTimeString(''), getDateString(''), 60),
        Validators.required,
      ],
      date: [
        getDateString(this.card.time) || getDateString(''),
        Validators.required,
      ],
      location: [this.card.location || 'переговорка 20', Validators.required],
      target_audience: [this.card.target_audience || '', Validators.required],
      need_to_know: [this.card.need_to_know || '', Validators.required],
      will_happen: [this.card.will_happen || '', Validators.required],
      reason_to_come: [this.card.reason_to_come || '', Validators.required],
    });
  }

  get requredForm() {
    if (
      this.MeetupEditReactiveForm.value.name &&
      this.MeetupEditReactiveForm.value.description &&
      this.MeetupEditReactiveForm.value.startTime &&
      this.MeetupEditReactiveForm.value.endTime &&
      this.MeetupEditReactiveForm.value.date &&
      this.MeetupEditReactiveForm.value.location &&
      this.MeetupEditReactiveForm.value.target_audience &&
      this.MeetupEditReactiveForm.value.need_to_know &&
      this.MeetupEditReactiveForm.value.will_happen &&
      this.MeetupEditReactiveForm.value.reason_to_come
    ) {
      return true;
    } else {
      return false;
    }
  }

  createObj() {
    const duration = durationCalculation(
      this.MeetupEditReactiveForm.value.date!,
      this.MeetupEditReactiveForm.value.startTime!,
      this.MeetupEditReactiveForm.value.endTime!
    );

    const meetupObj = {
      id: this.card.id,
      name: this.MeetupEditReactiveForm.value.name!,
      description: this.MeetupEditReactiveForm.value.description!,
      location: this.MeetupEditReactiveForm.value.location!,
      date: getISODate(
        this.MeetupEditReactiveForm.value.date!,
        this.MeetupEditReactiveForm.value.startTime!
      ),
      duration: duration,
      target_audience: this.MeetupEditReactiveForm.value.target_audience!,
      need_to_know: this.MeetupEditReactiveForm.value.need_to_know!,
      will_happen: this.MeetupEditReactiveForm.value.will_happen!,
      reason_to_come: this.MeetupEditReactiveForm.value.reason_to_come!,
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
