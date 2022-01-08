import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Federacion } from '../shared/entidades/federacion';
import { map, catchError, tap } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'my-auth-token'
  })
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
    return this.http.put<Federacion>("/api/federacion/" + federacion.id, federacion, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addFederacion(federacion:Federacion): Observable<Federacion> {
    return this.http.post<Federacion>("/api/federacion/" + federacion.id, federacion, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }


  remove(id): void {
    console.log(id);
  }
}
