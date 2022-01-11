import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntrenadoresService } from '../../services/entrenadores.service';
import { JugadoresService } from '../../services/jugadores.service';
import { Entrenador } from '../../shared/entidades/entrenador';
import { Entrenamiento } from '../../shared/entidades/entrenamiento';
import { EntrenamientosDia } from '../../shared/entidades/entrenamientosDia';
import { Jugador } from '../../shared/entidades/jugador';

@Component({
  selector: 'app-calendario-entrenamientos',
  templateUrl: './calendario-entrenamientos.component.html',
  styleUrls: ['./calendario-entrenamientos.component.scss']
})

export class CalendarioEntrenamientosComponent implements OnInit {
  entrenador: Entrenador;
  fechaEntrenamiento : any;
  entrenamientosDia: EntrenamientosDia;
  jugadores: Jugador[];

  constructor(public dialogRef: MatDialogRef<CalendarioEntrenamientosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entrenador, private entrenadorService: EntrenadoresService, private datePipe: DatePipe,
    private jugadoresService : JugadoresService) {
      this.entrenador = data;
     }

  ngOnInit() {
        // inicializar clubes del formulario
        this.jugadoresService.getJugadores().subscribe(response => {
          console.log(response);
          this.jugadores = response;
        })
  }

  
  dateChange(value : any){
    console.log(this.datePipe.transform(this.fechaEntrenamiento, 'dd/MM/yyyy'));

    console.log(this.entrenador.calendarioEntrenamientos);
    this.entrenador.calendarioEntrenamientos.forEach(calentamiento => {
      console.log(calentamiento.fecha);
        if(calentamiento.fecha == this.datePipe.transform(this.fechaEntrenamiento, 'dd/MM/yyyy') ){
          console.log("ENCONTRADO");
          this.entrenamientosDia = calentamiento;
          console.log(this.entrenamientosDia);
        }
    });
  }

}
