import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Entrenador } from '../shared/entidades/entrenador';
import { map, catchError, tap } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

const httpOptions = {
  headers: new HttpHeaders({
  'content-type': 'application/json;' })
};

@Injectable({
  providedIn: 'root'
})
export class EntrenadoresService {

  entrenadores$: BehaviorSubject<Entrenador[]>;
  entrenadores: Array<Entrenador> = [];
  entrenadoresObservable: any;

  constructor(private http: HttpClient, private procesaHttpmsjService: ProcesaHTTPMsjService) { 
    this.entrenadores$ = new BehaviorSubject([]);
    this.entrenadores = [];
  }

  getEntrenadores(): Observable<any> {
    console.log("getEntrenadores")
    return this.http.get<any>("/api/entrenador/").pipe(
      tap(response => {
        this.entrenadores$.next(response)
      })
    );
  }

  setEntrenador(entrenador:Entrenador): Observable<Entrenador> {
    console.log("putEntrenador: " + JSON.stringify(entrenador));
    return this.http.put<Entrenador>("/api/entrenador/"+entrenador.id, entrenador, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addEntrenador(entrenador:Entrenador): Observable<Entrenador> {
    console.log("postEntrenador: " + JSON.stringify(entrenador));
    return this.http.post<Entrenador>('/api/entrenador/', entrenador, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteEntrenador(id: string): Observable<Entrenador> {
    console.log("deleteEntrenador: " + id);
    return this.http.delete<Entrenador>("/api/entrenador/"+id, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
