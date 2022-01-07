import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ResultadoPartidaService } from 'src/app/services/resultado-partida.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-resultado-partida',
  templateUrl: './resultado-partida.component.html',
  styleUrls: ['./resultado-partida.component.scss']
})
export class ResultadoPartidaComponent implements OnInit {
  
  resultado = -1;
  resultsForm!: FormGroup;
  
  
  constructor(private resultPartidaService: ResultadoPartidaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ResultadoPartidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      
      this.crearFormulario();
      
    }
    
    crearFormulario() {
      this.resultsForm = this.fb.group({
        result: ["-1", Validators.required]
      }); 
    }
    
    onSubmit() {
      this.resultPartidaService.saveResult
      if (this.resultado != null) {
        console.log("pasando el resultado")
        this.dialogRef.close(this.resultado);
      }
      else {
        let resultado = {tablas: false, ganador: 1, duracion: 213412};;
        this.dialogRef.close(resultado);
      }
    }
    
    ngOnInit() {
      console.log("data partida", this.data)
      
      // this.resultPartidaService.getResult(this.data.partida.id).subscribe((resp:any) => {
      //   if (resp.resultado.ganador == null) {
      //     this.resultado = -1;
      //   } else {
      //     this.resultado = resp.resultado.ganador;
      //   }
      //   console.log("Resultado del subscribe: " + this.resultado);
      // });
    }
    
  }
  