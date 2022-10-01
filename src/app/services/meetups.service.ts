import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class MeetupsService {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  getMeetups(): Observable<object> {
    return this.http.get(`${environment.backendOrigin}/meetup`);
  }

  createMeetup(
    name: string,
    description: string,
    time: string,
    duration: number,
    location: string,
    target_audience: string,
    need_to_know: string,
    will_happen: string,
    reason_to_come: string
  ) {
    return this.http
      .post(`${environment.backendOrigin}/meetup`, {
        name,
        description,
        time,
        duration,
        location,
        target_audience,
        need_to_know,
        will_happen,
        reason_to_come,
      })
      .pipe(
        tap((res) => {
          this.router.navigate(['meetups']);
          console.log(res);
        })
      );
  }

  subscribeMeetup(idMeetup: number, idUser: number) {
    return this.http.put(`${environment.backendOrigin}/meetup`, {
      idMeetup,
      idUser,
    });
  }

  unsubscribeMeetup(idMeetup: number, idUser: number) {
    const option = {
      body: { idMeetup, idUser }
    }
    return this.http
    .delete(`${environment.backendOrigin}/meetup`, option);
  }
}
