import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleFactura } from '../data/DetalleFactura';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturasService {
  private API_SERVER = "http://localhost:8022/detallesFactura"
  constructor(private http: HttpClient) { }

  // Crear nuevos detalles de pedido
  createDetalles(detalles: DetalleFactura[]): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, detalles);
  }

// Actualizar un detalle de pedido existente
updateDetalle(detalle: DetalleFactura): Observable<RespuestaDTO> {
  return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, detalle);
}

  // Eliminar un detalle de pedido por ID
  deleteDetalle(idDetalleFactura: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idDetalleFactura}`);
  }

  // Obtener detalles de un pedido
  getDetallesPedido(idFactura: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/factura/${idFactura}`);
  }
}
