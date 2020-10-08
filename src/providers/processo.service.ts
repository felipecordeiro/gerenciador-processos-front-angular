import { GenericService } from './generic.service';
import { Processo } from './../to/processo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService extends GenericService {

  constructor(private httpClient: HttpClient) {
    super()
  }

  create(processo: Processo): Observable<Processo> {
    return this.httpClient.post<Processo>(this.apiServer + '/processo/', JSON.stringify(processo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<Processo> {
    return this.httpClient.get<Processo>(this.apiServer + '/processo/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<Processo[]> {
    return this.httpClient.get<Processo[]>(this.apiServer + '/processo/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(processo: Processo): Observable<Processo> {
    return this.httpClient.put<Processo>(this.apiServer + '/processo/', JSON.stringify(processo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id) {
    return this.httpClient.delete<Processo>(this.apiServer + '/processo/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

}
