import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../data/Categoria';
import { RespuestaDTO } from '../data/RespuestaDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private API_SERVER ="http://localhost:8022/categorias"
  constructor(private http:HttpClient) { }

  // Crear una nueva categoría
  createCategoria(categoria: Categoria): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, categoria);
  }

  // Obtener todas las categorías
  getAllCategorias(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
  }

  // Actualizar una categoría existente
  updateCategoria(categoria: Categoria): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, categoria);
  }

  // Eliminar una categoría por ID
  deleteCategoria(idCategoria: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idCategoria}`);
  }

}
