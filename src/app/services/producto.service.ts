import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../data/Producto';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_SERVER = "http://localhost:8022/productos"
  constructor(private http: HttpClient) { }


  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, producto);
  }

  // Obtener todos los productos
  getAllProductos(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
  }

  // Actualizar un producto existente
  updateProducto(producto: Producto): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, producto);
  }

  // Eliminar un producto por ID
  deleteProducto(idProducto: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idProducto}`);
  }

  // Obtener productos por categoría
  getProductosCategoria(idCategoria: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/categoria/${idCategoria}`);
  }

  // Obtener productos por unidad
  getProductosUnidad(idUnidad: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/unidad/${idUnidad}`);
  }
}

