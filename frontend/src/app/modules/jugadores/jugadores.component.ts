import { Component, OnInit } from '@angular/core';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { Jugador } from 'src/app/shared/entidades/jugador';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

  vJugadores:Jugador[] = [];

  public dataSource: MatTableDataSource<Jugador>;
  private serviceSubscribe: Subscription;

  constructor(private jugadorService:JugadoresService) {
    this.dataSource = new MatTableDataSource<Jugador>();
  }

  ngOnInit() {
    this.serviceSubscribe = this.jugadorService.getJugadores().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
    })
  }

}
