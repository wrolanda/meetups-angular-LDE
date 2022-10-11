import { User } from './user';

export interface Meetup {
  id: number;
  name: string;
  description: string;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  time: string;
  duration: number;
  owner: User;
  users: Array<User>;

  createdAt: string;
  createdBy: number;
  updatedAt: string;
}

export class Meetup {
  constructor(
    id: number,
    name: string,
    description: string,
    location: string,
    target_audience: string,
    need_to_know: string,
    will_happen: string,
    reason_to_come: string,
    time: string,
    duration: number,
    createdBy: number,
    owner: User,
    users: Array<User>
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.target_audience = target_audience;
    this.need_to_know = need_to_know;
    this.will_happen = will_happen;
    this.reason_to_come = reason_to_come;
    this.time = time;
    this.duration = duration;
    this.createdBy = createdBy;
    this.owner = owner;
    this.users = users;
  }
}

export class MeetupCreate {
  constructor(
    name: string,
    description: string,
    location: string,
    target_audience: string,
    need_to_know: string,
    will_happen: string,
    reason_to_come: string,
    time: string,
    duration: number,
  ) {}
}
