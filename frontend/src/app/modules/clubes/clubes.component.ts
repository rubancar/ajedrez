import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/shared/entidades/club';
import { MatTableDataSource } from '@angular/material/table';
import { DialogClubComponent } from './dialog-club/dialog-club.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.scss']
})
export class ClubesComponent implements OnInit {

  public dataSource: MatTableDataSource<Club>;
  private actionsFunctions: any;
  private displayedColumns: string[];

  constructor(private clubService:ClubService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) { 
    this.dataSource = new MatTableDataSource<Club>();
    this.actionsFunctions = ['edit', 'delete'];
    this.displayedColumns = ['nombre', 'direccion', 'usuario_entrenador', 'federacion'];
  }

  ngOnInit() {
    this.clubService.getClubes().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
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
      data: new Club(element.id, element.nombre, element.direccion, element.usuario_entrenador, element.federacion)
    });
    
    this.actionAfterClosingDialog(dialogRef);
  }

  actionAfterClosingDialog(dialogRef: any) {
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this._snackBar.open(result, "X");
      }
    });
  }

}
