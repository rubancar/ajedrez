import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntrenadoresService } from '../../../services/entrenadores.service';
import { Entrenador } from '../../../shared/entidades/entrenador';

@Component({
  selector: 'app-dialog-entrenador',
  templateUrl: './dialog-entrenador.component.html',
  styleUrls: ['./dialog-entrenador.component.scss']
})
export class DialogEntrenadorComponent implements OnInit {

  entrenadorForm: FormGroup;
  entrenador: Entrenador;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogEntrenadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entrenador, private entrenadorService: EntrenadoresService) {

    this.entrenadorForm = this.fb.group({
      id: "",
      nombre: ["", Validators.required],
      calendarioEntrenamientos: null
    });

    this.entrenadorForm.setValue(data);
    this.entrenador = new Entrenador();
  }

  ngOnInit() {
  }


  onSubmit() {
    this.entrenador = this.entrenadorForm.value;
    console.log(this.entrenador);

    // si hay id estamos editando
    if (this.entrenador.id) {
      this.entrenadorService.setEntrenador(this.entrenador).subscribe(federacion => {this.entrenador = federacion});
    } else {
      this.entrenadorService.addEntrenador(this.entrenador).subscribe(federacion => {this.entrenador = federacion});
    }

    this.dialogRef.close("Guardado con exito");
  }

}
