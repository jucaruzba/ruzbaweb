import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unidad } from '../data/Unidad';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private API_SERVER = "http://localhost:8022/unidades"
  constructor(private http: HttpClient) { }


  // Crear una nueva unidad
  createUnidad(unidad: Unidad): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, unidad);
  }

  // Obtener todas las unidades
  getAllUnidades(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
  }

  // Actualizar una unidad existente
  updateUnidad(unidad: Unidad): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, unidad);
  }

  // Eliminar una unidad por ID
  deleteUnidad(idUnidad: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idUnidad}`);
  }
}
