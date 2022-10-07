import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, filter, mergeMap, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meetup } from '../entities/meetup';
@Injectable()
export class MeetupsService implements OnDestroy {
  
  meetups: Observable<any> = this.http.get(
    `${environment.backendOrigin}/meetup`
  );

  dataMeetups: Array<Meetup> = [];
  interval: any;

  subject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.refreshMeetups();
    this.interval = setInterval(() => this.refreshMeetups(), 10000);
  }
  
 
  /*getMeetups() {
    return this.subject.pipe(distinctUntilChanged((a, b) => this.deepEqual(a,b)),
    tap((res) => console.log(res)));
  }*/

  refreshMeetups() {
    this.meetups.subscribe((res) => this.subject.next(res));
  }

  getSubject() {
    return this.subject.pipe(distinctUntilChanged((a, b) => this.deepEqual(a,b)),
    tap((res) => console.log(res)));
  }

 private deepEqual(a: any, b: any) {
    if (a === b) {
      return true;
    }
    if (a === null || b === null ||typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (let i = 0; i < aKeys.length; i += 1) {
      const key = aKeys[i];
      if (!bKeys.includes(key) || !this.deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  };

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
