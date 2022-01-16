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

  erroresForm: any = {
    'nombre':'',
    'direccion':''
  };

  mensajesError: any = {
    'nombre': {
      'required': 'El nombre es obligatorio.'
    },
    'direccion': {
      'required': 'La direccion es obligatoria.'
    }
  };

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogFederacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Federacion, private federacionService: FederacionesService) {

    this.federacionForm = this.fb.group({
      id: "",
      nombre: ["", Validators.required],
      direccion: ["", Validators.required]
    });

    this.federacionForm.valueChanges.subscribe(datos => this.onCambioValor(datos))

    this.federacionForm.setValue(data);
    this.federacion = new Federacion();
  }

  ngOnInit() {
  }


  onCambioValor(data?: any) {
    if (!this.federacionForm) { return; }
    const form = this.federacionForm;
    for (const field in this.erroresForm) {
      // Se borrarán los mensajes de error previos
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
          this.federacionForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.federacion = this.federacionForm.value;
    console.log(this.federacion);

    // si hay id estamos editando
    if (this.federacion.id == null || this.federacion.id == '') {
      this.federacionService.addFederacion(this.federacion).subscribe(response => {
        console.log("Response save from API:", response);
        this.resetForm();
        this.dialogRef.close("Guardado correctamente");
      })
    } else {
      this.federacionService.setFederacion(this.federacion).subscribe(response => {
        console.log("Response edit from API:", response);
        this.resetForm();
        this.dialogRef.close("Editado correctamente");
      })  
    }

    this.dialogRef.close("Guardado con exito");
  }

  resetForm() {
    this.federacionForm.reset({
      id: "",
      nombre: "",
      direccion: "",
    });
  }

}