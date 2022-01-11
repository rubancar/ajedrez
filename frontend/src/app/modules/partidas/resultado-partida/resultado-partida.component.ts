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
  
  resultado = -1;
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
        result: ["-1", [Validators.required, Validators.min(-1)]],
      }); 
    }
    
    onSubmit() {
      console.log("resultado del submit 3", this.resultsForm.value.result);
      this.partida.resultado = this.resultsForm.value.result

      // let data = { resultado: this.resultsForm.value.result, id: this.partida.id };
      // Aqui meto el result en la paritda y salvo la partida completa
      this.resultPartidaService.saveResult(this.partida).subscribe( (data) => {
        console.log("K paso?: ", data);
        this.dialogRef.close(data);
      });
    }

    ngOnInit() {
      console.log("data partida", this.data.partida.resultado);
      this.partida = this.data.partida;
      console.log("partidssfasa", this.partida);
        if (this.data.partida.resultado.  ganador == null) {
          this.resultado = -1;
        } else {
          this.resultado = this.data.partida.resultado.ganador;
        }
        this.resultsForm.reset({
          result :  this.resultado,
        });
    }
    

  }
  