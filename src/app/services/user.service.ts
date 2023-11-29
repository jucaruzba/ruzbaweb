import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';
import { User } from '../data/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_SERVER = "http://localhost:8022/users"
  constructor(private http: HttpClient) { }


  // Verificar token
  verifyToken(idToken: string): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/verifyToken?idToken=${idToken}`);
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, user);
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
  }

  // Obtener usuario por ID de autenticación
  getUserBySession(idAutheticacion: string): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/buscar/${idAutheticacion}`);
  }

  // Actualizar un usuario existente
  updateUser(updatedUser: User): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, updatedUser);
  }

  // Eliminar un usuario por ID
  deleteUser(idUser: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idUser}`);
  }
}
