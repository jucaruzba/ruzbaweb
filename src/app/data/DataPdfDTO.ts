export class DataPdfDTO implements DataPdfDTO {
    constructor(
      public idPedido: number,
      public observaciones: string,
      public iva: number,
    ) {}
  }