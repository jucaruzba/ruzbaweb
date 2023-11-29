import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../data/Cliente';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private API_SERVER = "http://localhost:8022/clientes"
  constructor(private http: HttpClient) { }

  // Crear un nuevo usuario
  createCliente(cliente: Cliente): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, cliente);
  }

  // Obtener todos los usuarios
  getAllClientes(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/obtener-todos`);
  }

  // Obtener usuario por ID de autenticación
  getClienteIdUser(idUser: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/obtener-por-usuario/${idUser}`);
  }

  // Actualizar un usuario existente
  updateCliente(updatecliente: Cliente): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, updatecliente);
  }

  // Eliminar un usuario por ID
  deleteCliente(idCliente: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idCliente}`);
  }
}
