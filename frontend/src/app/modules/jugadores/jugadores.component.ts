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
  private serviceSubscribe: Subscription;
  private actionsFunctions: any;
  private displayedColumns: string[];

  constructor(private jugadorService:JugadoresService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Jugador>();
    this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = ['name', 'usuario', 'elo', 'responsable', 'es_moroso',  'fecha_nacimiento'];
  }

  ngOnInit() {
    this.serviceSubscribe = this.jugadorService.getJugadores().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
    })
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
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
    const dialogEditJugador = this.dialog.open(DialogJugadorComponent, {
      width: '60%',
      data: new Jugador(element.id, element.name, element.usuario, element.password, element.elo, element.responsable,
        element.es_moroso, new Date(element.fecha_nacimiento), element.club)
    });
    console.log(element);
  }

  newJugador() {
    const dialogRef = this.dialog.open(DialogJugadorComponent, {
      width: '60%',
      data: new Jugador()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this._snackBar.open("Jugador creado correctamente", "X");
    });
  }


}
