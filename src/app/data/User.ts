import { Roles } from "./Roles";

export class User {
    constructor(
      public idUser?: number,
      public idAutheticacion?: string,
      public nombre?: string,
      public email?: string,
      public password?: string,
      public imagen?: string,
      public rol?: Roles
    ) {}
  }

