import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meetup } from '../entities/meetup';
import { deepEqual } from '../shared/mathFuncs/mathFuncs';

@Injectable()
export class MeetupsService implements OnDestroy {
  
  dataMeetups: Array<Meetup> = [];
  interval: any;
  
  public subject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.refreshMeetups();
    this.interval = setInterval(() => this.refreshMeetups(), 10000);
  }

  getMeetups(): Observable<any> {
    return this.http.get(
      `${environment.backendOrigin}/meetup`
    );
  } 

  refreshMeetups() {
    this.getMeetups().subscribe((res) => this.subject.next(res));
  }

  getSubject() {
    return this.subject.pipe(distinctUntilChanged((a, b) => deepEqual(a,b)),
    tap((res) => console.log(res)));
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
        tap(() => {
          this.router.navigate(['meetups']);
        })
      );
  }

  editMeetup(
    id: number,
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
      .put(`${environment.backendOrigin}/meetup/${id}`, {
        name,
        description,
        time,
        duration,
        location,
        target_audience,
        need_to_know,
        will_happen,
        reason_to_come,
      });
  }

  /*nameUniqueValid(newName: string) {
    this.getMeetups().pipe(
      mergeMap((items: any) => items.name),
      filter((names: any) => names.includes(newName)),
      tap((resName) => {
        console.log (resName ? false : true);
      })
    )
  }*/

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

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
