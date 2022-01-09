import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntrenadoresService } from '../../services/entrenadores.service';
import { JugadoresService } from '../../services/jugadores.service';
import { Entrenador } from '../../shared/entidades/entrenador';
import { DateAdapter } from '@angular/material/core';
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
    @Inject(MAT_DIALOG_DATA) public data: Entrenador, private entrenadorService: EntrenadoresService, private dateAdapter: DateAdapter<Date>,
    private jugadoresService : JugadoresService) {
      this.entrenador = data;
      this.dateAdapter.setLocale('en-GB');
     }

  ngOnInit() {
        // inicializar clubes del formulario
        this.jugadoresService.getJugadores().subscribe(response => {
          console.log(response);
          this.jugadores = response;
        })
  }

  
  dateChange(value : any){
    console.log(this.fechaEntrenamiento.toLocaleString().split(' 0:')[0]);

    console.log(this.entrenador.calendarioEntrenamientos);
    this.entrenador.calendarioEntrenamientos.forEach(calentamiento => {
        if(calentamiento.fecha == this.fechaEntrenamiento.toLocaleString().split(' 0:')[0] ){
          console.log("ENCONTRADO");
          this.entrenamientosDia = calentamiento;
          console.log(this.entrenamientosDia);
        }
    });
  }

}
