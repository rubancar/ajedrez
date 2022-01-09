import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jugador } from 'src/app/shared/entidades/jugador';
import { Subscription } from 'rxjs';
import { JugadoresService } from 'src/app/services/jugadores.service';


@Component({
  selector: 'app-dialog-jugador',
  templateUrl: './dialog-jugador.component.html',
  styleUrls: ['./dialog-jugador.component.scss']
})
export class DialogJugadorComponent implements OnInit {

  jugadorForm: FormGroup;
  jugador: Jugador;
  private serviceSubscribe: Subscription;

  constructor(private jugadorService:JugadoresService,
    public dialogRef: MatDialogRef<DialogJugadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Jugador) { 
    
      this.jugadorForm = new FormGroup({
        "id": new FormControl(''),
        "name":  new FormControl('', Validators.required),
        "usuario": new FormControl('', Validators.required),
        "password": new FormControl('', Validators.required),
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

  onSubmit() {
    this.jugador = this.jugadorForm.value;

    // se extrae el valor del id
    const id = this.jugadorForm.get("id");

    // si id está presente entonces estamos editando
    if(id) {
      this.jugador.fecha_nacimiento = this.jugador.fecha_nacimiento.toISOString().split('T')[0]
      this.jugadorService.saveJugador(this.jugador).subscribe(response => {
        console.log("Response from API:", response)
        this.dialogRef.close("guardado correcto");
      })
    }
    

    // sino tenemos id entonces estamos creando un nuevo jugador
  }

}
