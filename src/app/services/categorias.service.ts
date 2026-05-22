import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { CategoriasInterface } from '../interfaces/categorias.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private http = inject(HttpClient);
  private apiURL: string = environment.BASE_URL;

  obtenerCategorias(index: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}categorias/getall`, { params: { index, limit } });
  }

  crearCategorias(objeto: CategoriasInterface): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}categorias/create`, objeto);
  }

  actualizarCategorias(objeto: CategoriasInterface): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiURL}categorias/update/${objeto.idCategoria}`, objeto);
  }

  eliminarCategoria(objeto: CategoriasInterface): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiURL}categorias/delete/${objeto.idCategoria}`);
  }
}