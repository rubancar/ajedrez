import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { Partida } from '../shared/entidades/partida';
import { PartidasService } from './partidas.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultadoPartidaService {
  
  resultado: number = -1;
  
  constructor(private partidaService: PartidasService, private http : HttpClient ) { }
  
  saveResult (partida : Partida): Observable<any> {  
    console.log("Enviando a partida con PUT", partida)
    return this.partidaService.editPartida(partida)
  }
  
  getResult(id:string) {
    return this.partidaService.getPartida(id);
  }
}
