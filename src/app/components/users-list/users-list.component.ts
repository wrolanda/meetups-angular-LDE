import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input()
  usersList!: Array<User>;

  @Output()
  public addEventDel = new EventEmitter();
  @Output()
  public addEventUpdUser = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}
  
}
