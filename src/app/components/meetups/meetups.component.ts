import { Component, Input, OnInit } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss']
})
export class MeetupsComponent implements OnInit {

  @Input()
  arrayMeetups!: Array<Meetup>;
  constructor() { }

  ngOnInit(): void {
  }

}
