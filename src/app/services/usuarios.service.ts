import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { UsuariosInterface } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiURL: string = environment.BASE_URL;

  obtenerUsuarios(index: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}usuarios/getall`, { params: { index, limit } });
  }

  crearUsuarios(objeto: UsuariosInterface): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}usuarios/create`, objeto);
  }

  actualizarUsuarios(objeto: UsuariosInterface): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiURL}usuarios/update/${objeto.idUsuario}`, objeto);
  }

  eliminarUsuario(objeto: UsuariosInterface): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiURL}usuarios/delete/${objeto.idUsuario}`);
  }
}