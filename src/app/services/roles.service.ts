import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../data/Roles';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../data/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private API_SERVER = "http://localhost:8022/roles"
  constructor(private http: HttpClient) { }


  // Crear un nuevo rol
  createRole(rol: Roles): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.API_SERVER}/crear`, rol);
  }

  // Obtener todos los roles
  getAllRoles(): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/todos`);
  }

  // Obtener un rol por ID
  getRoleById(idRol: number): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.API_SERVER}/buscar/${idRol}`);
  }

  // Actualizar un rol existente
  updateRole(updatedRole: Roles): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.API_SERVER}/actualizar`, updatedRole);
  }

  // Eliminar un rol por ID
  deleteRole(idRol: number): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.API_SERVER}/eliminar/${idRol}`);
  }
}
