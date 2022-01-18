import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/shared/entidades/club';
import { MatTableDataSource } from '@angular/material/table';
import { DialogClubComponent } from './dialog-club/dialog-club.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { EntrenadoresService } from 'src/app/services/entrenadores.service';
import { FederacionesService } from 'src/app/services/federaciones.service';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.scss']
})
export class ClubesComponent implements OnInit {

  public dataSource: MatTableDataSource<Club>;
  private actionsFunctions: any;
  private displayedColumns: Array<any>;
  private isLoading : boolean;

  constructor(private clubService:ClubService,
    private federacionesService: FederacionesService,
    private entrenadorService:EntrenadoresService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { 
    this.dataSource = new MatTableDataSource<Club>();
    this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = [{valueName:'nombre', displayName:'Nombre'}, {valueName:'direccion', displayName:'Dirección'},
    {valueName:'entrenador', displayName:'Entrenador'}, {valueName:'federacion', displayName:'Federación'}];
  }

  ngOnInit() {
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.federacionesService.getFederaciones().subscribe(federaciones => {

      this.entrenadorService.getEntrenadores().subscribe(entrenadores => {

        this.clubService.getClubes().subscribe(res => {
          console.log(res);
          res.forEach(element => {
            const { federacion_id = "", entrenador_id = "" } = element;
  
            const entrenador = entrenadores.find(ent => ent.id == entrenador_id);
            const federacion_ = federaciones.find(ent => ent.id == federacion_id);
  
            element['federacion_id'] = federacion_id;
            element['federacion'] = federacion_.nombre;
            element['entrenador'] = entrenador.nombre;
            element['entrenador_id'] = entrenador_id;
          });
          console.log(res);
          this.dataSource.data = res;
          this.isLoading = false;
        })
      })

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
        this.clubService.removeClub(element);
      }
    });
  }


  newClub() {
    const dialogRef = this.dialog.open(DialogClubComponent, {
      width: '60%',
      data: new Club()
    });

    this.actionAfterClosingDialog(dialogRef);
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(DialogClubComponent, {
      width: '60%',
      data: new Club(element.id, element.nombre, element.direccion, element.entrenador_id, element.federacion_id)
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
