import { Cliente } from "./Cliente";

export class Pedido {
    constructor(
      public idPedido?: number,
      public estatus?: number,
      public fecha?: string,
      public total?: number,
      public idCliente?: Cliente
    ) {}
  }