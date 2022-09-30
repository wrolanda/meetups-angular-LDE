import { Role } from "./role";

export interface User {
  createdAt: string,
  email: string,
  fio: string,
  id: number,
  password: string,
  roles: Array<Role>,
  updatedAt: string,
}

export class User {
  constructor(
    createdAt: string,
    email: string,
    fio: string,
    id: number,
    password: string,
    roles: Array<Role>,
    updatedAt: string,
  ) {
    this.createdAt = createdAt;
    this.email = email;
    this.fio = fio;
    this.id = id;
    this.password = password;
    this.roles = roles;
    this.updatedAt = updatedAt;
  }
}
