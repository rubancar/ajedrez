import { Component, OnInit } from '@angular/core';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { Jugador } from 'src/app/shared/entidades/jugador';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

  vJugadores:Jugador[] = [];

  constructor(private jugadorService:JugadoresService) { }

  ngOnInit() {
    this.jugadorService.getJugadores().subscribe(jugadores => this.vJugadores=jugadores);
  }

}
