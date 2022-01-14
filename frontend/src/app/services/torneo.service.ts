import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Torneo } from '../shared/entidades/torneo';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';


@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  partidas$: any;
  

  constructor( private http : HttpClient, private procesaHttpmsjService: ProcesaHTTPMsjService ) { }


  getTorneo(id: string) : Observable<any> {
    return this.http.get<any>(`/api/torneos/${id}`)
  }

  getTorneos(): Observable<any> {
    return this.http.get<any>("/api/torneos/")
  }

  editTorneo(torneo: Torneo): Observable<any> {
    const torneo_id = torneo.id;
    console.log(torneo_id);
    return this.http.put<any>(`/api/torneos/${torneo_id}`, torneo)
  }

  saveTorneo(torneo: Torneo): Observable<any> {
    console.log("Antes del post: ", torneo)
    return this.http.post<any>("/api/torneos/", torneo)
  }

  remove(torneo_id): Observable<any> {
    console.log(torneo_id);
    return this.http.delete<any>(`/api/torneos/${torneo_id}`)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));

  }
}
