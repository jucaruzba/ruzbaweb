import { Factura } from "./Facturas";
import { Producto } from "./Producto";

export class DetalleFactura {
    constructor(
      public idDetalle?: number,
      public cantidad?: number,
      public suma?: number,
      public idFactura?: Factura,
      public idProducto?: Producto
    ) {}
  }