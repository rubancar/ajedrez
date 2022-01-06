import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jugador } from 'src/app/shared/entidades/jugador';

@Component({
  selector: 'app-dialog-jugador',
  templateUrl: './dialog-jugador.component.html',
  styleUrls: ['./dialog-jugador.component.scss']
})
export class DialogJugadorComponent implements OnInit {

  jugadorForm: FormGroup;
  jugador: Jugador;

  constructor(public dialogRef: MatDialogRef<DialogJugadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Jugador) { 
    
      this.jugadorForm = new FormGroup({
        "id": new FormControl(''),
        "name":  new FormControl('', Validators.required),
        "usuario": new FormControl('', Validators.required),
        "elo": new FormControl('', Validators.required),
        "responsable": new FormControl('', Validators.required),
        "es_moroso": new FormControl('', Validators.required),
        "fecha_nacimiento": new FormControl('', Validators.required),
        "club": new FormControl('', Validators.required)
      });

      this.jugadorForm.setValue(data);
      this.jugador = new Jugador();
    }

  ngOnInit() {
  }

  save(data: Jugador): void {
    console.log("guardar y salir del cuadro de dialogo", data);
  }

  onSubmit() {
    this.jugador = this.jugadorForm.value;

    // adicional se puede extraer el valor de las variables con get
    //console.log(this.jugadorForm.get("name")?.value);

    console.log(this.jugador);
  }

}
