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
  
  saveResult (data : any): Observable<any> {
    const url = `http://localhost:3000/partidas/${data.id}`;
    console.log("Resultado del ganador: ", data.resultado);
    let info = {
      resultado: {
        tablas: data.resultado == -1 ,
        ganador: data.resultado == -1 ? null : parseInt(data.resultado)
      }
    };
    
    return this.http.put(url, info);
  }
  
  getResult(id:string) {
    return this.partidaService.getPartida(id);
  }
}
