import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private userService: UsersService) { }

  ngOnInit(): void {}

  delUser(id: number) {
    this.userService.delUser(id).subscribe(console.log);    
  }
}
