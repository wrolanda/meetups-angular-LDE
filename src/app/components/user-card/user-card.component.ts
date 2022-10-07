import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  user!: User;

  @Output()
  addEventDelUser = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {}

  deleteUser() {
    this.addEventDelUser.emit(this.user.id);
  }

}
