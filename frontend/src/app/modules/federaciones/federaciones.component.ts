import { Component, OnInit } from '@angular/core';
import { FederacionesService } from '../../services/federaciones.service';
import { Federacion } from '../../shared/entidades/federacion';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DialogFederacionComponent } from './dialog-federacion/dialog-federacion.component';

@Component({
  selector: 'app-federaciones',
  templateUrl: './federaciones.component.html',
  styleUrls: ['./federaciones.component.scss']
})
export class FederacionesComponent implements OnInit {

  public dataSource: MatTableDataSource<Federacion>;
  private serviceSubscribe: Subscription;
  private actionsFunctions: any;
  private displayedColumns: Array<any>;
  private isLoading : boolean;

  constructor(private federacionService:FederacionesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Federacion>();
    this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = [{valueName:'nombre', displayName:'Nombre'}, {valueName:'direccion', displayName:'Dirección'}];
  }

  refresh() {
    this.serviceSubscribe = this.federacionService.getFederaciones().subscribe(res => {
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
      default:
        console.warn(`Action ${eventData.action_name} not implemented`);
        break;
    }
  }

  delete(element: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.federacionService.deleteFederacion(element.id).subscribe(id => {element.id = id});
        this.refresh();
      }     
    });
  }

  edit(element: any) {
    //console.log("editando elemento");
    const dialogRef = this.dialog.open(DialogFederacionComponent, {
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

  newFederacion() {
    const dialogRef = this.dialog.open(DialogFederacionComponent, {
      width: '60%',
      data: new Federacion()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.refresh();
      }
    });
  }

}
