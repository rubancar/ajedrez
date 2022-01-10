import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Torneo } from '../shared/entidades/torneo';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  partidas$: any;

  constructor( private http : HttpClient ) { }


  getTorneo(id: string) : Observable<any> {
    return this.http.get<any>(`/api/torneos/${id}`)
  }

  getTorneos(): Observable<any> {
    console.log("getTorneos")
    return this.http.get<any>("/api/torneos/")
  }

  editTorneo(torneo: Torneo): Observable<any> {
    const torneo_id = torneo.id;
    console.log(torneo_id);
    return this.http.put<any>(`/api/torneos/${torneo_id}`, torneo)
  }

  saveTorneo(torneo: Torneo): Observable<any> {
    return this.http.post<any>("/api/torneos/", torneo)
  }

  remove(id): void {
    console.log(id);
  }
}
