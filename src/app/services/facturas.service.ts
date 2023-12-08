import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../data/Facturas';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private API_SERVER = "http://localhost:8022/facturas"
  constructor(private http: HttpClient) { }


    // Crear un nuevo pedido
    createFactura(factura: Factura): Observable<RespuestaDTO> {
      return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, factura);
    }
  
    // Obtener todos los pedidos
    getAllFacturas(): Observable<RespuestaDTO> {
      return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
    }
  
    // Obtener un pedido por ID
    getFacturaById(idFactura: number): Observable<RespuestaDTO> {
      return this.http.get<RespuestaDTO>(`${this.API_SERVER}/${idFactura}`);
    }
  
    // Actualizar un pedido existente
    updateFactura(factura: Factura): Observable<RespuestaDTO> {
      return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, factura);
    }
  
  
    // Obtener pedidos de un cliente
    getFacturasCliente(idCliente: number): Observable<RespuestaDTO> {
      return this.http.get<RespuestaDTO>(`${this.API_SERVER}/cliente/${idCliente}`);
    }
  
  
  
    // Obtener detalles de un pedido
    getFacturaDetalles(idFactura: number): Observable<RespuestaDTO> {
      return this.http.get<RespuestaDTO>(`${this.API_SERVER}/detalles/${idFactura}`);
    }
  
    // Obtener un PDF
    getPdf(idFactura: number): Observable<any> {
      return this.http.get(`${this.API_SERVER}/pdf/${idFactura}` ,{ responseType: 'arraybuffer' });
    }
}
