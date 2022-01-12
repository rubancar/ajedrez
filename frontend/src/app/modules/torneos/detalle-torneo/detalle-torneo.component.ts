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
      this.displayedColumns = ['sede', 'jugador1', 'jugador2'];
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.torneoService.getTorneo(this.id).subscribe((resp:any) => {
        this.torneo = new Torneo();
        this.torneo.id = resp.id;
        this.torneo.name = resp.name;
        this.torneo.sede = resp.sede;
        this.torneo.partidas = resp.partidas;
        console.log("el torneo: " +  this.torneo.name);
        this.dataSource.data = resp.partidas;
        console.log("el torneo: " +  resp.partidas);


        this.dataSource.data = resp.partidas.map((partida) => {
          let resultado = "Tablas"
          if(partida.resultado == partida.jugador1.id) {
            resultado = `Ganó ${partida.jugador1.name}`;
          } else if (partida.resultado == partida.jugador2.id) {
            resultado = `Ganó ${partida.jugador2.name}`;
          }
          partida.resultado = resultado
          let jugador1Item = partida.jugador1
          let jugador2Item = partida.jugador2
          partida.jugador1 =  partida.jugador1.name
          partida.jugador2 =  partida.jugador2.name
          partida.jugador1Item = jugador1Item
          partida.jugador2Item = jugador2Item
          return partida
        });



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
    console.log("El elemento", element.resultado);
    let dialog = this.dialog.open(ResultadoPartidaComponent,
      {width: '500px', height: '450px',
      data: {partida: element}});
      
    this.actionAfterClosingDialog(dialog);
  }
  
  actionAfterClosingDialog(dialog: MatDialogRef<ResultadoPartidaComponent, any>) {
    dialog.afterClosed().subscribe(data => {
      if(data) {
      console.log("AfterClose: " + data.resultado.ganador);
      }
    });
  }


  // ngOnDestroy(): void {
  //   this.serviceSubscribe.unsubscribe();
  // }

  // getRecord(row) {
  //   this.router.navigateByUrl(`/partidas/${row.id}`);
  // }

}
