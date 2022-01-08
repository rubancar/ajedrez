import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Entrenador } from '../../shared/entidades/entrenador';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntrenadoresService } from '../../services/entrenadores.service';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.scss']
})
export class EntrenadoresComponent implements OnInit {
 
  public dataSource: MatTableDataSource<Entrenador>;
  private serviceSubscribe: Subscription;
  private actionsFunctions: any;
  private displayedColumns: string[];

  constructor(private entrenadorService:EntrenadoresService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Entrenador>();
    this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = ['nombre'];
  }

  ngOnInit() {
    this.serviceSubscribe = this.entrenadorService.getEntrenadores().subscribe(res => {
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
        this.entrenadorService.remove(element.id);
      }
    });
  }

  edit(element: any) {
    console.log("editando elemento");
  }

  newFederacion() {
  /*  const dialogRef = this.dialog.open(DialogJugadorComponent, {
      width: '60%',
      data: new Federacion()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        //this.personsService.edit(result);
      }
    });*/
  }

}