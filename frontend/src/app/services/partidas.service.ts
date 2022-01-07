import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  constructor( private http : HttpClient ) { }

  getPartida(id: string) : Observable<any> {
    const url = `http://localhost:3000/partidas/${id}`;
    return this.http.get(url);
  }

}
