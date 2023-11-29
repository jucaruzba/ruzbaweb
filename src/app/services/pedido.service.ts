import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../data/Pedido';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';
import { DataPdfDTO } from '../data/DataPdfDTO';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private API_SERVER = "http://localhost:8022/pedidos"
  constructor(private http: HttpClient) { }

  // Crear un nuevo pedido
  createPedido(pedido: Pedido): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, pedido);
  }

  // Obtener todos los pedidos
  getAllPedidos(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
  }

  // Obtener un pedido por ID
  getPedidoById(idPedido: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/${idPedido}`);
  }

  // Actualizar un pedido existente
  updatePedido(pedido: Pedido): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, pedido);
  }

  // Eliminar un pedido por ID
  deletePedido(idPedido: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idPedido}`);
  }

  // Obtener pedidos de un cliente
  getPedidosCliente(idCliente: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/cliente/${idCliente}`);
  }

  // Obtener pedidos por fecha
  getPedidosFecha(fecha: string): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/fecha/${fecha}`);
  }

  // Obtener detalles de un pedido
  getPedidosDetalles(idPedido: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/detalles/${idPedido}`);
  }

  // Obtener un PDF
  getPdf(data: DataPdfDTO): Observable<any> {
    return this.http.post(`${this.API_SERVER}/pdf`, data, { responseType: 'arraybuffer' });
  }
}
