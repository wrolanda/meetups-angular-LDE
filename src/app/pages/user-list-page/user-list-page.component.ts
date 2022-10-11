import { Component, OnInit } from '@angular/core';
import { forkJoin, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';
import { sortList } from 'src/app/shared/mathFuncs/mathFuncs';

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

  delUser(id: number) {
    this.usersService.delUser(id).subscribe((result) => {
      this.usersService.updateUsers();
      console.log(result);  
    });    
  }

  updateUser(userObj: User) {
    forkJoin(
      [
      this.usersService.updateUser(
        userObj.id, userObj.email, userObj.password, userObj.fio
      ).pipe(
        takeUntil(this.notifier),
      ),
      
      this.usersService.updateRoleUser(
        userObj.roles[0].name, 
        userObj.id)
        .pipe(
          takeUntil(this.notifier),
        ),
      ] 
    ).subscribe((result) => {
      this.usersService.updateUsers();
      console.log(result);  
    }) 
  }
    


  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.subscription?.unsubscribe();
  }
}
