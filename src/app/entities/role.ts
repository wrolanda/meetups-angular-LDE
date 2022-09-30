export interface Role{
    id:	number,  
    name: string,
    createdAt: string,
    updatedAt: string,
}

export class Role {
    constructor(
        id:	number,  
        name: string,
        createdAt: string,
        updatedAt: string,
    ) {
      this.id =id;
      this.name = name;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }
}
