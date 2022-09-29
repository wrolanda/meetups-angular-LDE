export interface Role{
    id:	number,  
    name: string,
}

export class Role {
    constructor(
        id:	number,
        name: string,
    ) {
      this.id =id;
      this.name = name;
  }
}
