import { Component, OnInit } from '@angular/core';
import { Subscription, throttleTime } from 'rxjs';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
})
export class UserListPageComponent implements OnInit {
  usersList!: Array<User>;
  subscription!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.subscription = this.usersService.getUsers().subscribe((data) => {
      this.usersList = data as Array<User>;
      console.log(this.usersList);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
