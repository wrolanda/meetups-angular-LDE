import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { User } from '../entities/user';
import { Router } from '@angular/router';

const ADMIN = 'ADMIN';

@Injectable()
export class AuthService {
  public get isAdmin() {
    const token = this.token;
    if (token) {
      const jwtObj = this.parseJwt(token);
      for (let i = 0; i < jwtObj.roles.length; i++) {
        if (jwtObj.roles[i].id === 1 && jwtObj.roles[i].name === ADMIN) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  public get user(): User | null {
    const token = localStorage.getItem('del_meetups_auth_token');
    if (token) {
      const user: User = this.parseJwt(token);
      return user;
    }
    return null;
  }

  public get token(): string | null {
    return localStorage.getItem('del_meetups_auth_token');
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${environment.backendOrigin}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem('del_meetups_auth_token', res.token);
            this.router.navigate(['meetups']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('del_meetups_auth_token');
    this.router.navigate(['auth']);
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
