import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meetup } from 'src/app/entities/meetup';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss']
})
export class MeetupsComponent implements OnInit {

  @Input()
  arrayMeetups!: Array<Meetup>;

  @Output()
  public addEvent = new EventEmitter();
  @Output()  
  public addEventUnsub = new EventEmitter();
  @Output()
  public addEventDel = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}
