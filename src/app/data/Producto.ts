import { Categoria } from "./Categoria";
import { Unidad } from "./Unidad";

export class Producto {
  constructor(
    public idProducto?: number,
    public nombre?: string,
    public precio?: number,
    public descripcion?: string,
    public imagen?:string,
    public codigoSat?:string,
    public idCategoria?: Categoria,
    public idUnidad?: Unidad
  ) {}
}
