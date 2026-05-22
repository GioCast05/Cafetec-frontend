import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { ProductosInterface } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiURL: string = environment.BASE_URL;

  obtenerProductos(index: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}productos/getall`, { params: { index, limit } });
  }

  crearProductos(objeto: ProductosInterface): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}productos/create`, objeto);
  }

  actualizarProductos(objeto: ProductosInterface): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiURL}productos/update/${objeto.idProducto}`, objeto);
  }

  eliminarProducto(objeto: ProductosInterface): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiURL}productos/delete/${objeto.idProducto}`);
  }
}