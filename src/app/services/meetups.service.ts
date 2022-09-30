import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MeetupsService {

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getMeetups(): Observable<object> {
    return this.http.get(`${environment.backendOrigin}/meetup`);
  }


}
