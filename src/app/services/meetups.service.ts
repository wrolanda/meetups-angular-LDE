import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meetup, MeetupCreate, MeetupEdit } from '../entities/meetup';
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
    return this.http.get(`${environment.backendOrigin}/meetup`);
  }

  refreshMeetups() {
    this.getMeetups().subscribe((res) => {
      this.subject.next(res);
    });
  }

  getSubject() {
    return this.subject.pipe(
      distinctUntilChanged((a, b) => deepEqual(a, b)),
      tap((res) => console.log(res))
    );
  }

  createMeetup(meetup: MeetupCreate) {
    return this.http.post(`${environment.backendOrigin}/meetup`, meetup).pipe(
      tap(() => {
        this.router.navigate(['meetups']);
      })
    );
  }

  editMeetup(meetup: MeetupEdit) {
    return this.http.put(
      `${environment.backendOrigin}/meetup/${meetup.id}`,
      meetup
    );
  }

  subscribeMeetup(idMeetup: number, idUser: number): Observable<object> {
    return this.http.put(`${environment.backendOrigin}/meetup`, {
      idMeetup,
      idUser,
    });
  }

  unsubscribeMeetup(idMeetup: number, idUser: number) {
    const option = {
      body: { idMeetup, idUser },
    };
    return this.http.delete(`${environment.backendOrigin}/meetup`, option);
  }

  delMeetup(id: number) {
    return this.http.delete(`${environment.backendOrigin}/meetup/${id}`);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
