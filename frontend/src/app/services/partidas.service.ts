import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partida } from '../shared/entidades/partida';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  partidas$: any;

  constructor( private http : HttpClient ) { }

  // getPartidas() : Observable<any> {
  //   const url = `http://localhost:3000/partidas`;
  //   return this.http.get(url);
  // }

  getPartida(id: string) : Observable<any> {
    // const url = `http://localhost:3000/partidas/${id}`;
    return this.http.get<any>(`/api/partidas/${id}`)
    // return this.http.get(url);
  }

  getPartidas(): Observable<any> {
    console.log("getPartidas")
    return this.http.get<any>("/api/partidas/")
    // return this.http.get<any>("/api/partidas/").pipe(
    //   tap(response => {
    //     this.partidas$.next(response);
    //     console.log(this.partidas$)
    //   })
  }

  editPartida(partida: Partida): Observable<any> {
    const partida_id = partida.id;
    console.log(partida_id);
    return this.http.put<any>(`/api/partidas/${partida_id}`, partida)
  }

  savePartida(partida: Partida): Observable<any> {
    return this.http.post<any>("/api/partidas/", partida)
  }

  remove(id): void {
    console.log(id);
  }
}
