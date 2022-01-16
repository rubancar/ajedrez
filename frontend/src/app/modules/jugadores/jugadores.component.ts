import { Component, OnInit } from '@angular/core';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { Jugador } from 'src/app/shared/entidades/jugador';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DialogJugadorComponent } from './dialog-jugador/dialog-jugador.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

  public dataSource: MatTableDataSource<Jugador>;
  private actionsFunctions: any;
  private displayedColumns: Array<any>;
  private isLoading : boolean;

  constructor(private jugadorService:JugadoresService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Jugador>();
    this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = [{valueName:'name', displayName:'Nombre'}, {valueName:'usuario', displayName:'Usuario'},
    {valueName:'elo', displayName:'Elo'}, {valueName:'responsable', displayName:'Responsable'}, {valueName:'es_moroso', displayName:'¿Es moroso?'},
    {valueName:'fecha_nacimiento', displayName:'Fecha de nacimiento'}];
  }

  ngOnInit() {
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.jugadorService.getJugadores().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
      this.isLoading = false;
    })
  }

  callAction(eventData: any): void{
    switch(eventData.action_name) {
      case 'delete':
        this.delete(eventData.element)
        break;
      case 'edit':
        this.edit(eventData.element)
        break;
      default:
        console.warn(`Action ${eventData.action_name} not implemented`);
        break;
    }
  }

  delete(element: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jugadorService.remove(element.id);
      }
    });
  }

  edit(element: any) {
    console.log(element);
    const dialogRef = this.dialog.open(DialogJugadorComponent, {
      width: '60%',
      data: new Jugador(element.id, element.name, element.usuario, element.password, element.elo, element.responsable,
        element.es_moroso, new Date(element.fecha_nacimiento), element.club.id)
    });
    this.actionAfterClosingDialog(dialogRef);
  }

  newJugador() {
    const dialogRef = this.dialog.open(DialogJugadorComponent, {
      width: '60%',
      data: new Jugador()
    });
    this.actionAfterClosingDialog(dialogRef);
  }


  actionAfterClosingDialog(dialogRef: any) {
    dialogRef.afterClosed().subscribe(result => {
      this.refreshDataTable();
      if(result) {
        this._snackBar.open(result, "X");
      }
    });
  }
}
