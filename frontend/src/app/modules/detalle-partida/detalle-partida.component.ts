import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidasService } from 'src/app/services/partidas.service';
import { Partida } from 'src/app/shared/entidades/partida';
import { Jugador } from 'src/app/shared/entidades/jugador';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResultadoPartidaComponent } from '../resultado-partida/resultado-partida.component';



@Component({
  selector: 'app-detalle-partida',
  templateUrl: './detalle-partida.component.html',
  styleUrls: ['./detalle-partida.component.scss']
})
export class DetallePartidaComponent implements OnInit {
  
  id : string | null = '';
  partida? : Partida ;
  
  
  constructor(private route : ActivatedRoute,
             private partidasService : PartidasService,
             public dialogo: MatDialog,
             ) { }
  
  abrirResultadoForm() {
    let dialogo = this.dialogo.open(ResultadoPartidaComponent,
                                    {width: '500px', height: '450px',
                                    data: {partida: this.partida}});
    dialogo.afterClosed().subscribe(data => {
      if(data) {
        console.log("AfterClose: " + data.resultado.ganador);
        // Esto pincha ya 
        //this.partida.resultado = data.resultado;
      }
    });
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.partidasService.getPartida(this.id).subscribe((resp:any) => {
        this.partida = new Partida();
        this.partida.id = resp.id;
        this.partida.fecha = resp.fecha;
        this.partida.sede = resp.sede;
        this.partida.resultado = resp.resultado;
        this.partida.jugador1 = resp.jugador1;
        this.partida.jugador2 = resp.jugador2;
        console.log("pal form: " + this.partida.resultado);
      });
    }
  }
  
}
