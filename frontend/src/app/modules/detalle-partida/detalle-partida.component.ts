import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidasService } from 'src/app/services/partidas.service';
import { Partida } from 'src/app/shared/entidades/partida';
import { Jugador } from 'src/app/shared/entidades/jugador';


@Component({
  selector: 'app-detalle-partida',
  templateUrl: './detalle-partida.component.html',
  styleUrls: ['./detalle-partida.component.scss']
})
export class DetallePartidaComponent implements OnInit {
  
  id : string | null = '';
  partida? : Partida ;
  
  constructor(private route : ActivatedRoute, private partidasService : PartidasService) { }
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.partidasService.getPartida(this.id).subscribe((resp:any) => {
        this.partida = new Partida();
        this.partida.id = resp.id;
        this.partida.fecha = resp.fecha;
        this.partida.sede = resp.sede;
        for (let item of resp.jugadores) {
          let jugador = new Jugador();
          jugador.id = item.id;
          jugador.name = item.name;
          this.partida.jugadores.push(jugador);
        }
        console.log(this.partida);
      });
    }
  }
  
}
