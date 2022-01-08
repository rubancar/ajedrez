import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Partida } from 'src/app/shared/entidades/partida';
import { PartidasService } from 'src/app/services/partidas.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';


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
  @ViewChild(MatSort, {static: false}) sort: MatSort;    
  


  constructor(private partidasService: PartidasService,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Partida>();
    // this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = ['sede', 'jugador1', 'jugador2', 'fecha'];
  }

  ngOnInit() {
    this.serviceSubscribe = this.partidasService.getPartidas().subscribe(res => {
      console.log("the data-array", res);
      this.dataSource.data = res;
    })
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  getRecord(row) {
    console.log(row.id)
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
