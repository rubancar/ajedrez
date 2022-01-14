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
  // torneo: Torneo = new Torneo();
  jugadores: Jugador[] = []

  erroresForm: any = {
    "name":"",
    "sede":"",
    "jugadores":"",
  };

  mensajesError: any = {
    'name': {
      'required': 'El nombre es obligatorio.'
    },
    'sede': {
      'required': 'La sede es obligatorio.'
    },
    'jugadores': {
      'required': 'Debes elegir al menos dos jugadores.'
    },
  };
  
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

      // this.torneoForm.valueChanges.subscribe(datos => this.onCambioValor(datos));
      // this.torneoForm.setValue(data);
      // this.torneo = new Torneo();
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

    // onCambioValor(data?: any) {
    //   if (!this.torneoForm) { return; }
    //   const form = this.torneoForm;
    //   for (const field in this.erroresForm) {
    //     // Se borrarán los mensajes de error previos
    //     this.erroresForm[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.mensajesError[field];
    //       for (const key in control.errors) {
    //         this.erroresForm[field] += messages[key] + ' ';
    //       }
    //     }
    //   }
    // }

    onSubmit() {
      console.log("torneoform:", this.torneoForm.value)
      let torneo = new Torneo(this.torneoForm.value.name, this.torneoForm.value.sede, null,this.torneoForm.get('jugadores').value)
      this.torneoService.saveTorneo(torneo).subscribe((data) => {
        this.dialogRef.close(data)
      });
    }
    
  }
  