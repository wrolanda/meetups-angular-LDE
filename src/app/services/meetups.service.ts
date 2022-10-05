import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, mergeMap, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class MeetupsService {
  
  meetups: Observable<any> = this.http.get(
    `${environment.backendOrigin}/meetup`
  );
  subject = new Subject();

  constructor(private http: HttpClient, private router: Router) {
    setInterval(() => this.refreshMeetups(), 10000);
  }
  
  ngOnInit() {}

  getMeetups() {
    return this.subject.pipe();
  }

  refreshMeetups() {
    this.meetups.subscribe((res) => this.subject.next(res));
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
        })
      );
  }

  nameUniqueValid(newName: string) {
    this.getMeetups().pipe(
      mergeMap((items: any) => items.name),
      filter((names: any) => names.includes(newName)),
      tap((resName) => {
        console.log (resName ? false : true);
      })
    )
  }

  subscribeMeetup(idMeetup: number, idUser: number): Observable<object> {
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

  delMeetup(id: number) {
    return this.http
    .delete(`${environment.backendOrigin}/meetup/${id}`);
  }
}
