import { Component, OnInit, Inject } from '@angular/core';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/shared/entidades/torneo';
import { JugadoresComponent } from '../../jugadores/jugadores.component';

@Component({
  selector: 'app-dialog-torneo',
  templateUrl: './dialog-torneo.component.html',
  styleUrls: ['./dialog-torneo.component.scss']
})
export class DialogTorneoComponent implements OnInit {
  
  torneoForm: FormGroup;
  torneo: Torneo = new Torneo();
  jugadores = [{id:"1",nombre:"Eric"},{id:"2",nombre:"Ale"},{id:"3",nombre:"Facundo"},{id:"4",nombre:"Julian"},{id:"5",nombre:"Filiberto"},{id:"6",nombre:"Ruperto"}]
  
  constructor(private fb: FormBuilder,
    private jugadorService:JugadoresService,
    private torneoService:TorneoService,
    public dialogRef: MatDialogRef<DialogTorneoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Torneo) {
      this.torneoForm = this.fb.group({
        nombre: ["", Validators.required],
        sede: ["", Validators.required],
        jugadores: [[]]
      });
    }
    
    ngOnInit() {
      // console.log("torneoform:", this.torneoForm)
      // this.torneoForm.get('jugadores').setValue([1,2])
      // this.onJugadoresChange()
    }
    
    // onJugadoresChange() {
    //   this.torneoForm.get('jugadores')?.valueChanges.subscribe( ( val : any ) => {
    //     console.log("val:", val)
    //   })
    // }
    
  }
  