import { User } from "./User";

export class Cliente {
    constructor(
      public idCliente?: number,
      public nombre?: string,
      public rfc?: string,
      public direccion?: string,
      public cfdi?: string,
      public idUser?: User
    ) {}
  }