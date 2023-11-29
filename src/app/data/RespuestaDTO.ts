export class RespuestaDTO implements RespuestaDTO {
    constructor(
      public estatus: string,
      public mensaje: string,
      public lista: any[],
      public object: any,
      public tokenValid: boolean
    ) {}
  }