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

  constructor(private http: HttpClient) { 
    this.jugadores$ = new BehaviorSubject([]);
    this.jugadores = [];
  }

  getJugadores(): Observable<any> {
    console.log("getJugadores")
    return this.http.get<any>("/api/jugador/").pipe(
      tap(response => {
        this.jugadores$.next(response);
      })
    );
  }

  editJugador(jugador: Jugador): Observable<any> {
    const jugador_id = jugador.id;
    console.log(jugador_id);
    return this.http.put<any>(`/api/jugador/${jugador_id}`, jugador)
  }

  saveJugador(jugador: Jugador): Observable<any> {
    return this.http.post<any>("/api/jugador/", jugador)
  }

  remove(id: string): Observable<any> {
    console.log(`Deleting jugador`)
    return this.http.delete<any>(`/api/jugador/${id}`)
  }
}
