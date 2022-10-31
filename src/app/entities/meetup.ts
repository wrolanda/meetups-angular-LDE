import { User } from './user';

export interface IMeetup {
  id?: number;
  name: string;
  description: string;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  time: string;
  duration: number;
  owner?: User;
  users?: Array<User>;

  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
}

export class Meetup {
  id?: number;
  name: string;
  description: string;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  time: string;
  duration: number;
  owner?: User;
  users?: Array<User>;
  constructor(meetup: IMeetup) {
    this.id = meetup.id;
    this.name = meetup.name;
    this.description = meetup.description;
    this.location = meetup.location;
    this.target_audience = meetup.target_audience;
    this.need_to_know = meetup.need_to_know;
    this.will_happen = meetup.will_happen;
    this.reason_to_come = meetup.reason_to_come;
    this.time = meetup.time;
    this.duration = meetup.duration;
    this.owner = meetup.owner;
    this.users = meetup.users;
  }
}
