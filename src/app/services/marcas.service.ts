import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { MarcasInterface } from '../interfaces/marcas.interface';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private http = inject(HttpClient);
  private apiURL: string = environment.BASE_URL;

  obtenerMarcas(index: number, limit: number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.apiURL}marcas/getall`, {params: {index, limit}})
  }

  crearMarcas(objeto: MarcasInterface): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.apiURL}marcas/create`, objeto)
  }
  actualizarMarcas(objeto: MarcasInterface): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.apiURL}marcas/update/${objeto.idMarca}`, objeto)
  }  
  eliminarMarca(objeto: MarcasInterface): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.apiURL}marcas/delete/${objeto.idMarca}`)
  }
}
