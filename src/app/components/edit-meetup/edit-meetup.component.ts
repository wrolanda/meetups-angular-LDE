import {
  Component,
  Inject,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meetup, MeetupCreate } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';
import {
  durationCalculation,
  getDateString,
  getEndTime,
  getISODate,
  getTimeString,
} from 'src/app/shared/formateDate/formatDate';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-meetup',
  templateUrl: './edit-meetup.component.html',
  styleUrls: ['./edit-meetup.component.scss'],
  providers: [MeetupsService],
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

  // name: string = '';
  // description: string = '';
  // startTime: string = '';
  // endTime: string = '';
  // date: string = '';
  // location: string = '';
  // target_audience: string = '';
  // need_to_know: string = '';
  // will_happen: string = '';
  // reason_to_come: string = '';
  // duration: number = 0;

  @Output()
  edit = new EventEmitter<Meetup>();

  constructor(
    private fb: FormBuilder,
    private meetupService: MeetupsService,
    public dialogRef: MatDialogRef<EditMeetupComponent>,
    @Inject(MAT_DIALOG_DATA) public card: Meetup)
  {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initForm();

    //   this.MeetupEditReactiveForm.value.name = this.card.name;
    //   this.MeetupEditReactiveForm.value.description = this.card.description;
    //   this.MeetupEditReactiveForm.value.startTime = getTimeString(this.card.time);
    //   this.MeetupEditReactiveForm.value.endTime = getEndTime(
    //     getTimeString(this.card.time),
    //     getDateString(this.card.time),
    //     this.MeetupEditReactiveForm.value.duration);
    //   this.date = getDateString(this.card.time);
    //   this.description = this.card.description;
    //   this.target_audience = this.card.target_audience;
    //   this.need_to_know = this.card.need_to_know;
    //   this.will_happen = this.card.will_happen;
    //   this.reason_to_come = this.card.reason_to_come;
    //   this.duration = durationCalculation(this.startTime, this.endTime);
    // }
  }

  initForm() {
    this.MeetupEditReactiveForm = this.fb.group({
      name: [this.card.name, Validators.required],
      description: [this.card.description, Validators.required],
      startTime: [getTimeString(this.card.time), Validators.required],
      endTime: [getEndTime(
            getTimeString(this.card.time),
            getDateString(this.card.time),
            this.card.duration), Validators.required],
      date: [getDateString(this.card.time), Validators.required],
      location: [this.card.location, Validators.required],
      target_audience: [this.card.target_audience, Validators.required],
      need_to_know: [this.card.need_to_know, Validators.required],
      will_happen: [this.card.will_happen, Validators.required],
      reason_to_come: [this.card.reason_to_come, Validators.required],
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


  onEditMeetup() {
    const duration = durationCalculation(
      this.MeetupEditReactiveForm.value.date!,
      this.MeetupEditReactiveForm.value.startTime!,
      this.MeetupEditReactiveForm.value.endTime!)

      this.meetupService.editMeetup(
        this.card.id,
        this.MeetupEditReactiveForm.value.name!,
        this.MeetupEditReactiveForm.value.description!,
        getISODate(
          this.MeetupEditReactiveForm.value.date!,
          this.MeetupEditReactiveForm.value.startTime!),
        duration,
        this.MeetupEditReactiveForm.value.location!,
        this.MeetupEditReactiveForm.value.target_audience!,
        this.MeetupEditReactiveForm.value.need_to_know!,
        this.MeetupEditReactiveForm.value.will_happen!,
        this.MeetupEditReactiveForm.value.reason_to_come!,
        
  
        ).subscribe(console.log);
  }
}
