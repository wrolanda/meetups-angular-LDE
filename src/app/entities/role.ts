export interface IRole {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  constructor(role: IRole) {
    this.id = role.id;
    this.name = role.name;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
  }
}
