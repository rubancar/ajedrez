import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntrenadoresService } from '../../services/entrenadores.service';
import { JugadoresService } from '../../services/jugadores.service';
import { Entrenador } from '../../shared/entidades/entrenador';
import { Entrenamiento } from '../../shared/entidades/entrenamiento';
import { EntrenamientosDia } from '../../shared/entidades/entrenamientosDia';
import { Jugador } from '../../shared/entidades/jugador';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendario-entrenamientos',
  templateUrl: './calendario-entrenamientos.component.html',
  styleUrls: ['./calendario-entrenamientos.component.scss']
})

export class CalendarioEntrenamientosComponent implements OnInit {
  entrenador: Entrenador;
  // fechaEntrenamiento : Date;
  entrenamientosDia: EntrenamientosDia;
  jugadores: Jugador[];
  // jugador11 : Jugador;
  calendarioForm: any;

  constructor(public dialogRef: MatDialogRef<CalendarioEntrenamientosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entrenador, private entrenadorService: EntrenadoresService, private datePipe: DatePipe,
    private jugadoresService: JugadoresService) {
    this.entrenador = data;


    this.calendarioForm = new FormGroup({
      "fecha": new FormControl(''),
      "entrenamiento1": new FormGroup({
        "jugador1": new FormGroup(
          {
            "id": new FormControl('', Validators.required),
            "usuario": new FormControl('', Validators.required)
          }),
        "jugador2": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
      }, { validators: this.userNotTheSame }),
      "entrenamiento2": new FormGroup({
        "jugador1": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
        "jugador2": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
      }, { validators: this.userNotTheSame }),
      "entrenamiento3": new FormGroup({
        "jugador1": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
        "jugador2": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
      }, { validators: this.userNotTheSame }),
      "entrenamiento4": new FormGroup({
        "jugador1": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
        "jugador2": new FormGroup(
          {
            "id": new FormControl(''),
            "usuario": new FormControl('')
          }),
      }, { validators: this.userNotTheSame }),
    });
  }

  ngOnInit() {
    // inicializar clubes del formulario
    this.jugadoresService.getJugadores().subscribe(response => {
      console.log(response);
      this.jugadores = response;
    })

    console.log(this.entrenador.calendarioEntrenamientos);
  }


  userNotTheSame(c: AbstractControl): { invalid: boolean } {

    if (!(c.get('jugador1') == null || c.get('jugador2') == null) 
    && !(c.get('jugador1').value.id == '' || c.get('jugador2').value.id == '') 
    && !(c.get('jugador1').value.id == null || c.get('jugador2').value.id == null) 
    && c.get('jugador1').value.id == c.get('jugador2').value.id) {
      console.log("invalido");
      console.log(c.get('jugador1').value.id);
      console.log(c.get('jugador2').value.id);
      return { invalid: true };
    }
  }


  dateChange(value: any) {
    this.entrenamientosDia = this.calendarioForm.value;
    this.calendarioForm.reset();
    this.calendarioForm.controls['fecha'].setValue(this.entrenamientosDia.fecha);
    this.entrenador.calendarioEntrenamientos.forEach(calentamiento => {
      if (this.datePipe.transform(calentamiento.fecha, 'dd/MM/yyyy') == this.datePipe.transform(this.entrenamientosDia.fecha, 'dd/MM/yyyy')) {
        calentamiento.fecha = this.entrenamientosDia.fecha;
        this.calendarioForm.patchValue(calentamiento);
      }
    });
  }

  onSubmit() {
    this.entrenamientosDia = this.calendarioForm.value;
    console.log(this.entrenamientosDia);
    console.log(this.calendarioForm.invalid);

    this.entrenador.calendarioEntrenamientos.forEach((item, index, object) => {
      if (this.datePipe.transform(item.fecha, 'dd/MM/yyyy') == this.datePipe.transform(this.entrenamientosDia.fecha, 'dd/MM/yyyy')) {
        this.entrenador.calendarioEntrenamientos.splice(index, 1);
        this.entrenador.calendarioEntrenamientos.push(this.entrenamientosDia);

        this.entrenadorService.setEntrenador(this.entrenador).subscribe(entrenador => { this.entrenador = entrenador });
        this.dialogRef.close("Editado entrenamiento con exito");
      }
    });

    this.entrenador.calendarioEntrenamientos.push(this.entrenamientosDia);
    this.entrenadorService.setEntrenador(this.entrenador).subscribe(entrenador => { this.entrenador = entrenador });
    this.dialogRef.close("Guardado nuevo entrenamiento con exito");

  }


}
