import { Usuario } from './../to/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService {

  constructor(private httpClient: HttpClient) {
    super()
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.apiServer + '/usuario/', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getById(id): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.apiServer + '/usuario/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiServer + '/usuario/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.apiServer + '/usuario/', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id) {
    return this.httpClient.delete<Usuario>(this.apiServer + '/usuario/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  verificaUsuarioValido(login: string, password: string) {
    let usuario: Usuario = new Usuario
    usuario.login = login
    usuario.password = password
    return this.httpClient.post<Usuario>(this.apiServer + '/usuario/validation', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

}
