import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Federacion } from '../../../shared/entidades/federacion';

@Component({
  selector: 'app-dialog-federacion',
  templateUrl: './dialog-federacion.component.html',
  styleUrls: ['./dialog-federacion.component.scss']
})
export class DialogFederacionComponent implements OnInit {

  federacionForm: FormGroup;
  federacion: Federacion;

  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<DialogFederacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Federacion) { 
    
      this.federacionForm = this.fb.group({
        id: "",
        nombre: ["",Validators.required],
        direccion: ["",Validators.required]
      });

      this.federacionForm.setValue(data);
      this.federacion = new Federacion();
    }

  ngOnInit() {
  }


  onSubmit() {
    this.federacion = this.federacionForm.value;
    console.log(this.federacion);
    this.dialogRef.close(this.federacion);
  }

}