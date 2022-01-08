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
export class LoginService {

  constructor(private http: HttpClient, private procesaHttpmsjService: ProcesaHTTPMsjService) { }

  login(usuario : Usuario): Observable<any> {
    console.log("login with: " + JSON.stringify(usuario))
    return this.http.post<any>('/api/login/', usuario, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
