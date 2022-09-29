import { Component, Input, OnInit } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss']
})
export class MeetupCardComponent implements OnInit {

  @Input()
  card!: Meetup;

  constructor() { }

  ngOnInit(): void {}
}
