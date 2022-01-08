import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Federacion } from '../shared/entidades/federacion';
import { map, catchError, tap } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

const httpOptions = {
  headers: new HttpHeaders({
  'content-type': 'application/json;' })
};

@Injectable({
  providedIn: 'root'
})
export class FederacionesService {

  federaciones$: BehaviorSubject<Federacion[]>;
  federaciones: Array<Federacion> = [];
  federacionesObservable: any;

  constructor(private http: HttpClient, private procesaHttpmsjService: ProcesaHTTPMsjService) { 
    this.federaciones$ = new BehaviorSubject([]);
    this.federaciones = [];
  }

  getFederaciones(): Observable<any> {
    console.log("getFederaciones")
    return this.http.get<any>("/api/federacion/").pipe(
      tap(response => {
        this.federaciones$.next(response)
      })
    );
  }

  setFederacion(federacion:Federacion): Observable<Federacion> {
    console.log("putFederaciones: " + JSON.stringify(federacion));
    return this.http.put<Federacion>("/api/federacion/"+federacion.id, federacion, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addFederacion(federacion:Federacion): Observable<Federacion> {
    console.log("postFederaciones: " + JSON.stringify(federacion));
    return this.http.post<Federacion>('/api/federacion/', federacion, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteFederacion(id: string): Observable<Federacion> {
    console.log("deleteFederacion: " + id);
    return this.http.delete<Federacion>("/api/federacion/"+id, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
