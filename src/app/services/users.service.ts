import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserCreate } from '../entities/user';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<object> {
    return this.http.get(`${environment.backendOrigin}/user`);
  }

  createUser(email: string, password: string, fio: string) {
    return this.http
    .post(`${environment.backendOrigin}/auth/registration`, {
      email,
      password,
      fio,
    })
    .pipe();
  }

  delUser(id: number) {
    return this.http
    .delete(`${environment.backendOrigin}/user/${id}`);
  }
}
