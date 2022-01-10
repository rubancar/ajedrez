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
    console.log(element);
    const dialogRef = this.dialog.open(DetallePartidaComponent, {
      width: '60%',
      data: new Partida()
      // data: new Jugador(element.id, element.name, element.usuario, element.password, element.elo, element.responsable,
      //   element.es_moroso, new Date(element.fecha_nacimiento), element.club.id)
    });
    this.actionAfterClosingDialog(dialogRef);
  }
  
  actionAfterClosingDialog(dialogRef: MatDialogRef<DetallePartidaComponent, any>) {
    throw new Error('Method not implemented.');
  }


  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  getRecord(row) {
    this.router.navigateByUrl(`/partidas/${row.id}`);
  }

  // delete(element: any) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.jugadorService.remove(element.id);
  //     }
  //   });
  // }

  // edit(element: any) {
  //   const dialogEditJugador = this.dialog.open(DialogJugadorComponent, {
  //     width: '60%',
  //     data: new Jugador(element.id, element.name, element.usuario, element.password, element.elo, element.responsable,
  //       element.es_moroso, new Date(element.fecha_nacimiento), element.club)
  //   });
  //   console.log(element);
  // }

}
