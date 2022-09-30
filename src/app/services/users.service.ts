import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<object> {
    return this.http.get(`${environment.backendOrigin}/user`);
  }
}
