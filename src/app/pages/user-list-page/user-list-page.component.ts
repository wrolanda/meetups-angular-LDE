import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';
import { sortList } from 'src/app/shared/interfaces/mathFuncs/mathFuncs';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  providers: [UsersService],
})
export class UserListPageComponent implements OnInit {
  usersList!: Array<User>;
  subscription!: Subscription;
  notifier = new Subject<void>();


  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.subscription = this.usersService.getSubject().pipe(
      takeUntil(this.notifier),
    ).subscribe((data) => {
      this.usersList = sortList(data as Array<User>);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
