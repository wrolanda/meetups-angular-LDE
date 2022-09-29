export interface User {
  id: number,
  email: string,
  password: string,
  fio: string,
}

export class User {
  constructor(
    id: number,
    email: string,
    password: string,
    fio: string,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fio = fio;
  }
}
