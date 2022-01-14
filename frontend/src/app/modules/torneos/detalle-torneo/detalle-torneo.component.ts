import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartidasService } from 'src/app/services/partidas.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/shared/entidades/torneo';
import { MatTableDataSource } from '@angular/material/table';
import { ResultadoPartidaComponent } from '../../partidas/resultado-partida/resultado-partida.component';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.scss']
})
export class DetalleTorneoComponent implements OnInit {

  id : string | null = '';
  torneo: Torneo;
  serviceSubscribe: Subscription;
  dataSource: any;
  displayedColumns: Array<any>;
  actionsFunctions: string[];

  constructor(private route : ActivatedRoute,
              private torneoService : TorneoService,
              private partidasService: PartidasService,
              public dialog: MatDialog,
    ) {
      this.dataSource = new MatTableDataSource<Torneo>();
      this.actionsFunctions = ['edit'];
      this.displayedColumns = [{valueName:'sede', displayName:'Sede'}, {valueName:'jugador1', displayName:'Jugando Blancas'},
      {valueName:'jugador2', displayName:'Jugando Negras'}, {valueName:'resultado', displayName:'Resultado'} ];
    }

  // Esta bien hacer dos llamadas?? Esto solo seria para no guardar en el torneo 
  // la lista de partidas completa
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.torneo = new Torneo();
      this.torneoService.getTorneo(this.id).pipe(
        map(respT => {
          this.torneo.id = respT.id;
          this.torneo.name = respT.name;
          this.torneo.sede = respT.sede;
        }),
        switchMap(() => this.partidasService.getPartidasTorneo(this.id))
      ).subscribe((respP:any) => {
          this.torneo.partidas = respP;
          // console.log("response del obsv:final ", this.torneo)
          this.dataSource.data = respP;
      })
    } else {
      console.log("error obteniendo el id del torneo")
    }
  }

  callAction(eventData: any): void{
    switch(eventData.action_name) {
      case 'edit':
        this.edit(eventData.element)
        break;
      default:
        console.warn(`Action ${eventData.action_name} not implemented`);
        break;
    }
  }

  edit(element: any) {
    let dialog = this.dialog.open(ResultadoPartidaComponent,
      {width: '500px', height: '450px',
      data: {partida: element}});
      
    this.actionAfterClosingDialog(dialog);
  }
  
  actionAfterClosingDialog(dialog: MatDialogRef<ResultadoPartidaComponent, any>) {
    dialog.afterClosed().subscribe(data => {
      if(data) {
        console.log("Nuevo resulado: " + data.resultado);
      }
    });
  }


}
