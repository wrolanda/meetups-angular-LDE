import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input()
  usersList!: Array<User>;

  constructor() { }

  ngOnInit(): void {}

}
