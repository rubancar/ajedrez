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

  getPartida(id: string) : Observable<any> {
    return this.http.get<any>(`/api/partidas/${id}`)
  }

  getPartidas(): Observable<any> {
    console.log("getPartidas")
    return this.http.get<any>("/api/partidas/")
  } 

  getPartidasTorneo(id: string): Observable<any> {
    console.log("obteniendo Partidas del torneo")
    return this.http.get<any>("/api/partidas/", {params: {"torneoId": id}})
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
