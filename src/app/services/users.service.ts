import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../entities/user';
import { deepEqual } from '../shared/mathFuncs/mathFuncs';

@Injectable()
export class UsersService implements OnDestroy {
  interval: any;

  subject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.updateUsers();
    this.interval = setInterval(() => this.updateUsers(), 20000);
  }

  getUsers(): Observable<object> {
    return this.http.get(`${environment.backendOrigin}/user`);
  }

  updateUsers() {
    this.getUsers().subscribe((res) => this.subject.next(res));
  }

  getSubject() {
    return this.subject.pipe(
      distinctUntilChanged((a, b) => deepEqual(a, b)),
      tap((res) => console.log(res))
    );
  }

  createUser(user: IUser) {
    return this.http
      .post(`${environment.backendOrigin}/auth/registration`, user)
      .pipe(
        tap(() => {
          this.router.navigate(['userList']);
        })
      );
  }

  delUser(id: number) {
    return this.http.delete(`${environment.backendOrigin}/user/${id}`);
  }

  updateUser(user: IUser) {
    return this.http.put(`${environment.backendOrigin}/user/${user.id}`, user);
  }

  updateRoleUser(roleName: Array<string>, userId: number) {
    // if (roleName[0] === "ADMIN")
    // roleName = ["USER", "ADMIN"];
    return this.http.post(`${environment.backendOrigin}/user/role`, {
      names: roleName,
      userId: userId,
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
