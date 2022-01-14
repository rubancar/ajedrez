import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ResultadoPartidaService } from 'src/app/services/resultado-partida.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Partida } from 'src/app/shared/entidades/partida';

@Component({
  selector: 'app-resultado-partida',
  templateUrl: './resultado-partida.component.html',
  styleUrls: ['./resultado-partida.component.scss']
})
export class ResultadoPartidaComponent implements OnInit {
  
  resultado: string;
  partida: Partida = new Partida();
  resultsForm!: FormGroup;
  
  
  constructor(private resultPartidaService: ResultadoPartidaService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<ResultadoPartidaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) {
      
      this.crearFormulario();
      
    }
    
    crearFormulario() {
      this.resultsForm = this.fb.group({
        result: ["", [Validators.required, Validators.requiredTrue]],
      }); 
      console.log("al crear el form", this.resultsForm.value)
    }
    
    onSubmit() {
      console.log("resultado: ", this.resultsForm.get('result').value)
      this.partida.resultado = this.resultsForm.get('result').value;
      
      // console.log("Check resultado: ", this.partida.resultado)

      this.resultPartidaService.saveResult(this.partida).subscribe( (data) => {
        this.dialogRef.close(data);
      });
    }

    ngOnInit() {
      this.partida = this.data.partida;
      console.log("Partida: ", this.partida)
        if (this.data.partida.resultado == null) {

          console.log("resultad de dialog on init", this.resultado)

          this.resultado = "tablas";
        } else {
          this.resultado = this.data.partida.resultado;
        }
        this.resultsForm.reset({
          result :  this.resultado,
        });
    }
    

  }
  