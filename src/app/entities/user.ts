import { Role } from './role';

export interface IUser {
  id?: number;

  email: string;
  fio: string;
  password: string;

  roles?: Array<Role>;
  createdAt?: string;
  updatedAt?: string;
}

export class User {
  id?: number;

  email: string;
  fio: string;
  password: string;

  roles?: Array<Role>;
  createdAt?: string;
  updatedAt?: string;

  constructor(user: IUser) {
    this.id = user.id;

    this.email = user.email;
    this.fio = user.fio;
    this.password = user.password;

    this.roles = user.roles;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
