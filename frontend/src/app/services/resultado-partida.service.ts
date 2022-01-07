import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { Partida } from '../shared/entidades/partida';
import { PartidasService } from './partidas.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoPartidaService {
  
  resultado: number = -1;
  
  constructor(private partidaService: PartidasService) { }
  
  saveResult () {
    console.log("Salvando partida")
  }
  
  getResult(id:string) {
    return this.partidaService.getPartida(id);
  }
}
