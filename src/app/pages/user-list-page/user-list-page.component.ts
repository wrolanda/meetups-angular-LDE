import { Component, OnInit } from '@angular/core';
import { forkJoin, Subject, Subscription, takeUntil } from 'rxjs';
import { Role } from 'src/app/entities/role';
import { IUser } from 'src/app/entities/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UsersService } from 'src/app/services/users.service';
import { sortListCompareFn } from 'src/app/shared/mathFuncs/mathFuncs';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  providers: [UsersService],
})
export class UserListPageComponent implements OnInit {
  notifier = new Subject<void>();

  usersList!: Array<IUser>;
  subscription!: Subscription;

  constructor(
    private usersService: UsersService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.subscription = this.usersService
      .getSubject()
      .pipe(takeUntil(this.notifier))
      .subscribe((data: Array<IUser>) => {
        this.usersList = data.sort(sortListCompareFn);
      });
  }

  delUser(id: number) {
    this.usersService.delUser(id).subscribe((result) => {
      this.usersService.updateUsers();
      console.log(result);
    });
  }

  updateUser(user: IUser) {
    forkJoin([
      this.usersService.updateUser(user).pipe(takeUntil(this.notifier)),

      this.usersService
        .updateRoleUser(this.arrayNamesRoles(user.roles!), user.id!)
        .pipe(takeUntil(this.notifier)),
    ]).subscribe((result) => {
      this.usersService.updateUsers();
      console.log(result);
    });
  }

  arrayNamesRoles(arrayObjRole: Array<Role>): Array<string> {
    let arrayNameRoles = [];
    for (let i = 0; i < arrayObjRole.length; i++) {
      arrayNameRoles.push(arrayObjRole[i].name);
    }
    return arrayNameRoles;
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.subscription?.unsubscribe();
  }
}
