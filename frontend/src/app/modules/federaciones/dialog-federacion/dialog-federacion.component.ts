import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Federacion } from '../../../shared/entidades/federacion';
import { FederacionesService } from '../../../services/federaciones.service';

@Component({
  selector: 'app-dialog-federacion',
  templateUrl: './dialog-federacion.component.html',
  styleUrls: ['./dialog-federacion.component.scss']
})
export class DialogFederacionComponent implements OnInit {

  federacionForm: FormGroup;
  federacion: Federacion;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogFederacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Federacion, private federacionService: FederacionesService) {

    this.federacionForm = this.fb.group({
      id: "",
      nombre: ["", Validators.required],
      direccion: ["", Validators.required]
    });

    this.federacionForm.setValue(data);
    this.federacion = new Federacion();
  }

  ngOnInit() {
  }


  onSubmit() {
    this.federacion = this.federacionForm.value;
    console.log(this.federacion);

    // si hay id estamos editando
    if (this.federacion.id) {
      this.federacionService.setFederacion(this.federacion).subscribe(federacion => {this.federacion = federacion});
    } else {
      this.federacionService.addFederacion(this.federacion).subscribe(federacion => {this.federacion = federacion});
    }

    this.dialogRef.close("Guardado con exito");
  }

}