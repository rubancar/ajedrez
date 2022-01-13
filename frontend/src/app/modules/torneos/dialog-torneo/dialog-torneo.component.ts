import { Component, OnInit, Inject } from '@angular/core';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/shared/entidades/torneo';
import { Jugador } from 'src/app/shared/entidades/jugador';

@Component({
  selector: 'app-dialog-torneo',
  templateUrl: './dialog-torneo.component.html',
  styleUrls: ['./dialog-torneo.component.scss']
})
export class DialogTorneoComponent implements OnInit {
  
  torneoForm: FormGroup;
  torneo: Torneo = new Torneo();
  jugadores: Jugador[] = []
  
  constructor(private fb: FormBuilder,
    private jugadorService:JugadoresService,
    private torneoService:TorneoService,
    public dialogRef: MatDialogRef<DialogTorneoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Torneo) {
      this.torneoForm = this.fb.group({
        name: ["", Validators.required],
        sede: ["", Validators.required],
        jugadores: [""]
      });
    }
    
    ngOnInit() {
      console.log("torneoform:", this.torneoForm)
      this.jugadores = []
      this.jugadorService.getJugadores().subscribe((data) => {
        for (let item of data) {
          let jugador = new Jugador()
          jugador.id = item.id
          jugador.name = item.name
          this.jugadores.push(jugador)
        }
        console.log("jugadores 2:", this.jugadores)
      });
      this.torneoForm.get('jugadores').setValue([1,2])
      this.onJugadoresChange()
    }
    
    onJugadoresChange() {
      this.torneoForm.get('jugadores').valueChanges.subscribe(value => {
        console.log("jugadores:", value)
      })
    }

    onSubmit() {
      console.log("torneoform:", this.torneoForm.value)
      let torneo = new Torneo(this.torneoForm.value.name, this.torneoForm.value.sede)
      this.torneoService.saveTorneo(torneo).subscribe((data) => {
        this.dialogRef.close(data)
      });
    }
    
  }
  