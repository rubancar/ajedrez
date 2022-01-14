import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartidasService } from 'src/app/services/partidas.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/shared/entidades/torneo';
import { MatTableDataSource } from '@angular/material/table';
import { ResultadoPartidaComponent } from '../../partidas/resultado-partida/resultado-partida.component';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.scss']
})
export class DetalleTorneoComponent implements OnInit {

  id : string | null = '';
  torneo: Torneo;
  partidasService: any;
  serviceSubscribe: Subscription;
  dataSource: any;
  displayedColumns: string[];
  actionsFunctions: string[];

  constructor(private route : ActivatedRoute,
              private torneoService : TorneoService,
              partidasService: PartidasService,
              public dialog: MatDialog,
    ) {
      this.dataSource = new MatTableDataSource<Torneo>();
      this.actionsFunctions = ['edit'];
      this.displayedColumns = ['sede', 'jugador1', 'jugador2', 'resultado'];
    }

  // Esta bien hacer dos llamadas?? Esto solo seria para no guardar en el torneo 
  // la lista de partidas completa
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.torneo = new Torneo();
      this.torneoService.getTorneo(this.id).subscribe((resp:any) => {
        this.torneo.id = resp.id;
        this.torneo.name = resp.name;
        this.torneo.sede = resp.sede;
        this.torneo.partidas = resp.partidas;
        this.dataSource.data = resp.partidas;
      });
      this.partidasService.getPartidasTorneo(this.torneo.id).subscribe((resp:any) => {
        console.log("las partidas del torneo", resp)
        // this.torneo.partidas = resp;
        // this.dataSource.data = resp;
      });
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
      // console.log("AfterClose: " + data.resultado.ganador);
      }
    });
  }


}
