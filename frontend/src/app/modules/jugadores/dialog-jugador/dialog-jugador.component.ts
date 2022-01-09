import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jugador } from 'src/app/shared/entidades/jugador';
import { Subscription } from 'rxjs';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/shared/entidades/club';

@Component({
  selector: 'app-dialog-jugador',
  templateUrl: './dialog-jugador.component.html',
  styleUrls: ['./dialog-jugador.component.scss']
})
export class DialogJugadorComponent implements OnInit {

  jugadorForm: FormGroup;
  jugador: Jugador;
  clubes: Club[];

  erroresForm: any = {
    "name":"",
    "usuario":"",
    "password":"",
    "elo":"",
    "responsable":"",
    "es_moroso":"",
    "fecha_nacimiento":"",
    "club_id":"",
  };

  mensajesError: any = {
    'name': {
      'required': 'El nombre es obligatorio.'
    },
    'usuario': {
      'required': 'El usuario es obligatorio.'
    },
    'password': {
      'required': 'La contraseña es obligatoria.'
    },
    'elo': {
      'required': 'El número elo es obligatorio'
    },
    'fecha_nacimiento': {
      'required': 'La fecha de nacimiento es obligatoria'
    },
  };


  constructor(private jugadorService:JugadoresService,
    private clubService:ClubService,
    public dialogRef: MatDialogRef<DialogJugadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Jugador) { 
    
      this.jugadorForm = new FormGroup({
        "id": new FormControl(''),
        "name":  new FormControl('', Validators.required),
        "usuario": new FormControl('', Validators.required),
        "password": new FormControl('', Validators.required),
        "elo": new FormControl('', Validators.required),
        "responsable": new FormControl(''),
        "es_moroso": new FormControl(''),
        "fecha_nacimiento": new FormControl('', Validators.required),
        "club_id": new FormControl('')
      });

      this.jugadorForm.valueChanges.subscribe(datos => this.onCambioValor(datos));
      this.jugadorForm.setValue(data);
      this.jugador = new Jugador();
    }

  ngOnInit() {
    // inicializar clubes del formulario
    this.clubService.getClubes().subscribe(response => {
      console.log(response);
      this.clubes = response;
    })
  }

  onCambioValor(data?: any) {
    if (!this.jugadorForm) { return; }
    const form = this.jugadorForm;
    for (const field in this.erroresForm) {
      // Se borrarán los mensajes de error previos
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.jugador = this.jugadorForm.value;
    console.log("JUGADOR DATA:", this.jugador);
    // se extrae el valor del id
    const id = this.jugador.id;
    // si id está presente entonces estamos editando
    if(id == null || id === "") {
      this.jugador.fecha_nacimiento = this.jugador.fecha_nacimiento.toISOString().split('T')[0]
      this.jugadorService.saveJugador(this.jugador).subscribe(response => {
        console.log("Response from API:", response)
        this.dialogRef.close("Jugador guardado correcto");
      })
    } else {
      this.jugadorService.editJugador(this.jugador).subscribe(response => {
        console.log("Response edit from API", response);
        this.resetForm();
        this.dialogRef.close("Jugador editado correctamente");
      })
    }
  }

  resetForm() {
    this.jugadorForm.reset({
      "id": "",
      "name": "",
      "usuario": "",
      "password": "",
      "elo": -1,
      "responsable": "",
      "es_moroso": false,
      "fecha_nacimiento": "",
      "club_id": ""
    });
  }

}
