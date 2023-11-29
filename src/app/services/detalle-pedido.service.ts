import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../data/DetallePedido';
import { RespuestaDTO } from '../data/RespuestaDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  private API_SERVER = "http://localhost:8022/detallesPedido"
  constructor(private http: HttpClient) { }

  // Crear nuevos detalles de pedido
  createDetalles(detalles: DetallePedido[]): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, detalles);
  }

  // Actualizar un detalle de pedido existente
  updateDetalle(detalle: DetallePedido): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, detalle);
  }

  // Eliminar un detalle de pedido por ID
  deleteDetalle(idDetallePedido: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idDetallePedido}`);
  }

  // Obtener detalles de un pedido
  getDetallesPedido(idPedido: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/pedido/${idPedido}`);
  }
}
