import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Partida } from 'src/app/shared/entidades/partida';
import { PartidasService } from 'src/app/services/partidas.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DetallePartidaComponent } from './detalle-partida/detalle-partida.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ResultadoPartidaComponent } from './resultado-partida/resultado-partida.component';


@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit {

  partidas: Array<Partida> = [];
  private serviceSubscribe: Subscription;
  public dataSource: MatTableDataSource<Partida>;
  displayedColumns: string[];
  actionsFunctions: string[];
  partida? : Partida ;

  constructor(private partidasService: PartidasService,
              public dialog: MatDialog,
              private router : Router,
              private _snackBar: MatSnackBar) {
              this.dataSource = new MatTableDataSource<Partida>();
              this.actionsFunctions = ['edit'];
              this.displayedColumns = ['sede', 'jugador1', 'jugador2', 'resultado'];
  }


  ngOnInit() {
    this.serviceSubscribe = this.partidasService.getPartidas().subscribe(res => {
      console.log("the data-array", res);
      this.dataSource.data = res;
      // this.dataSource.sortingDataAccessor = (item, property) => {
      //   switch (property) {
      //      case 'jugador1.name':
      //         return item.jugador1.name;
      //      default:
      //         return item[property];
      //   }
      // };
    })

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
    // throw new Error('Method not implemented.');
  }


  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  getRecord(row) {
    this.router.navigateByUrl(`/partidas/${row.id}`);
  }


}
