import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Entrenador } from '../shared/entidades/entrenador';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntrenadoresService {

  entrenadores$: BehaviorSubject<Entrenador[]>;
  entrenadores: Array<Entrenador> = [];
  entrenadoresObservable: any;

  constructor(private http: HttpClient) { 
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

  remove(id): void {
    console.log(id);
  }
}
