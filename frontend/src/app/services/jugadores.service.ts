import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Jugador } from '../shared/entidades/jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadores$: BehaviorSubject<Jugador[]>;
  jugadores: Array<Jugador> = [];
  jugadoresObservable: any;

  constructor(private http: HttpClient) { 
    this.jugadores$ = new BehaviorSubject([]);
    this.jugadores = [];
  }

  getJugadores(): Observable<any> {
    console.log("getJugadores")
    return this.http.get<any>("/api/jugador/").pipe(
      tap(response => {
        this.jugadores$.next(response)
      })
    );
  }

  editJugador(jugador: Jugador): Observable<any> {
    return this.http.put<any>("/api/jugador/", jugador.getData())
  }

  saveJugador(jugador: Jugador): Observable<any> {
    return this.http.post<any>("/api/jugador/", jugador)
  }

  remove(id): void {
    console.log(id);
  }
}
