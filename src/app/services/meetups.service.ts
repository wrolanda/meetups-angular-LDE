import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meetup } from '../entities/meetup';

@Injectable()
export class MeetupsService {
  // arrayMeetups: Array<Meetup> = [
  //   {
  //     id: 1,
  //     name: 'RxJS',
  //     description: 'А здесь я ещё более подробно напишу об том, отб этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. А здесь я ещё более подробно напишу об том, отб этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом.',
  //     location: 'Переговорка 4',
  //     target_audience: 'Разработчики, аналитики',
  //     need_to_know: 'Ядренную физику',
  //     will_happen: 'Будем готовить пиццу',
  //     reason_to_come: 'Надо',
  //     time: '2022-09-22T12:07:57.745Z',
  //     duration: 90,
  //     createdBy: 2,
  //     owner: {
  //       id: 2,
  //       email: 'vsemKiskamPiece@example.com',
  //       password: 'password',
  //       fio: 'Artem Norm Chel',
  //     },
  //     users: [],
  //   },
  //   {
  //     id: 2,
  //     name: 'OldJS',
  //     description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  //     location: 'Переговорка 20',
  //     target_audience: 'клоуны',
  //     need_to_know: 'куда говотовилось нападение на Беларусь',
  //     will_happen: 'Будем ничего не делать',
  //     reason_to_come: 'Ну надо',
  //     time: '2022-09-22T09:07:57.745Z',
  //     duration: 45,
  //     createdBy: 1,
  //     owner: {
  //       id: 1,
  //       email: 'what.the@qwerty.com',
  //       password: 'password',
  //       fio: 'Oleksandr Ha Hahovich',
  //     },
  //     users: [
  //       {
  //         id: 2,
  //         email: 'vsemKiskamPiece@example.com',
  //         password: 'password',
  //         fio: 'Artem Norm Chel',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: 'CoolName',
  //     description: 'Расскажем об основах крутости',
  //     location: 'Переговорка -1',
  //     target_audience: 'грузчики',
  //     need_to_know: 'как тащить круглое и как толкать квадратное',
  //     will_happen: 'Будем клеить аппликации',
  //     reason_to_come: 'ну пожалуйста',
  //     time: '2022-09-22T09:06:57.748Z',
  //     duration: 10,
  //     createdBy: 1,
  //     owner: {
  //       id: 2,
  //       email: 'vsemKiskamPiece@example.com',
  //       password: 'password',
  //       fio: 'Artem Norm Chel',
  //     },
  //     users: [],
  //   },
  // ];

  arrayMeetups: Array<Meetup> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMeetups().subscribe({next:
    (data) => this.arrayMeetups = data as Array<Meetup>})
  }

  getMeetups(): Observable<object> {
    return this.http.get(`${environment.backendOrigin}/meetup`);
  }


}
