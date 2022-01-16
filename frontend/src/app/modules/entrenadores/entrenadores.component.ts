import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Entrenador } from '../../shared/entidades/entrenador';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntrenadoresService } from '../../services/entrenadores.service';
import { DialogEntrenadorComponent } from './dialog-entrenador/dialog-entrenador.component';
import { CalendarioEntrenamientosComponent } from '../calendario-entrenamientos/calendario-entrenamientos.component';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.scss']
})
export class EntrenadoresComponent implements OnInit {
 
  public dataSource: MatTableDataSource<Entrenador>;
  private serviceSubscribe: Subscription;
  private actionsFunctions: any;
  private displayedColumns: Array<any>;
  private isLoading : boolean;

  constructor(private entrenadorService:EntrenadoresService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Entrenador>();
    this.actionsFunctions = ['edit', 'delete', 'calendar_today'];
    this.displayedColumns = [{valueName:'nombre', displayName:'Nombre'}];
  }

  refresh() {
    this.serviceSubscribe = this.entrenadorService.getEntrenadores().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
      this.isLoading = false;
    })
  }

  ngOnInit() {
    this.refresh();
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
      case 'calendar_today':
        this.openCalendario(eventData.element);
      default:
        console.warn(`Action ${eventData.action_name} not implemented`);
        break;
    }
  }

  openCalendario(element:any){
    const dialogRef = this.dialog.open(CalendarioEntrenamientosComponent, {
      width: '60%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.refresh();
      }
    });
  }

  delete(element: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entrenadorService.deleteEntrenador(element.id).subscribe(id => {element.id = id});
        this.refresh();
      }     
    });
  }

  edit(element: any) {
    //console.log("editando elemento");
    const dialogRef = this.dialog.open(DialogEntrenadorComponent, {
      width: '60%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.refresh();
      }
    });
  }

  newEntrenador() {
    const dialogRef = this.dialog.open(DialogEntrenadorComponent, {
      width: '60%',
      data: new Entrenador()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.refresh();
      }
    });
  }

}
