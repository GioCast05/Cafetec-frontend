import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { LoginUsuarioRequest, registerUsuarioRequest } from '../interfaces/auth-request.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiURL: string = environment.BASE_URL;

  login(objeto: LoginUsuarioRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}auth/login`, objeto);
  }

  register(objeto: registerUsuarioRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}usuarios/addusuario`, objeto);
  }

  verifyToken(token: string){
    return this.http.post<ApiResponse>(`${this.apiURL}auth/verify-token`, {"token": token });
  }
}
