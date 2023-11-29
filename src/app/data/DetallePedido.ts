import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

export class DetallePedido {
    constructor(
      public idDetalle?: number,
      public cantidad?: number,
      public suma?: number,
      public idPedido?: Pedido,
      public idProducto?: Producto
    ) {}
  }