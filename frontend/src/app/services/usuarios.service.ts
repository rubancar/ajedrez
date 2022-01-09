import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../shared/entidades/usuario';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

const httpOptions = {
  headers: new HttpHeaders({
  'content-type': 'application/json;' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private procesaHttpmsjService: ProcesaHTTPMsjService) { }

  getUsuario(userName: string): Observable<Usuario> {
    return this.http.get<Usuario>('/api/usuario/'+ userName, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

}
