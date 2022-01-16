import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClubService } from 'src/app/services/club.service';
import { EntrenadoresService } from 'src/app/services/entrenadores.service';
import { FederacionesService } from 'src/app/services/federaciones.service';
import { Club } from 'src/app/shared/entidades/club';
import { Entrenador } from 'src/app/shared/entidades/entrenador';
import { Federacion } from 'src/app/shared/entidades/federacion';

@Component({
  selector: 'app-dialog-club',
  templateUrl: './dialog-club.component.html',
  styleUrls: ['./dialog-club.component.scss']
})
export class DialogClubComponent implements OnInit {

  clubForm: FormGroup;
  club: Club;
  entrenadores: Entrenador[];
  federaciones: Federacion[];

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

  constructor(private clubService:ClubService,
    private entrenadorService:EntrenadoresService,
    private federacionServicio:FederacionesService,
    public dialogRef: MatDialogRef<DialogClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Club) { 

      this.clubForm = new FormGroup({
        "id": new FormControl(''),
        "nombre": new FormControl('', Validators.required),
        "direccion": new FormControl('', Validators.required),
        "entrenador_id": new FormControl(''),
        "federacion_id": new FormControl('')
      });

      this.clubForm.valueChanges.subscribe(datos => this.onCambioValor(datos));
      this.clubForm.setValue(data);
      this.club = new Club();
    }

  ngOnInit() {
    // Inicializar entrenadores en el formulario
    this.entrenadorService.getEntrenadores().subscribe(response => {
      this.entrenadores = response;
      console.log(response);
    })

    // Inicializar federaciones en el formulario
    this.federacionServicio.getFederaciones().subscribe(response => {
      this.federaciones = response;
      console.log(response);
    })
  }

  onCambioValor(data?: any) {
    if (!this.clubForm) { return; }
    const form = this.clubForm;
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
    this.club = this.clubForm.value;
    // se extrae el valor del id
    const id = this.club.id;
    console.log(id);

    // si id está presente entonces estamos editando
    if(id == null || id === "") {
      this.clubService.saveClub(this.club).subscribe(response => {
        console.log("Response save from API:", response);
        this.resetForm();
        this.dialogRef.close("Guardado correctamente");
      })
    } else {
      this.clubService.editClub(this.club).subscribe(response => {
        console.log("Response edit from API:", response);
        this.resetForm();
        this.dialogRef.close("Editado correctamente");
      })
    }
  }

  resetForm() {
    this.clubForm.reset({
      "id": "",
      "nombre": "",
      "direccion": "",
      "usuario_entrenador": "",
      "federacion_id": ""
    });
  }

}
