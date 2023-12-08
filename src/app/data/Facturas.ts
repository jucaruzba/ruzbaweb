import { Cliente } from "./Cliente";

export class Factura {
    constructor(
      public idFactura?: number,
      public fecha?: string,
      public total?: number,
      public idCliente?: Cliente
    ) {}
  }