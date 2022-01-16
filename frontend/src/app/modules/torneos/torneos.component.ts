import { Component, OnInit } from '@angular/core';
import { TorneoService } from 'src/app/services/torneo.service'
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Torneo } from 'src/app/shared/entidades/torneo';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogTorneoComponent } from './dialog-torneo/dialog-torneo.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss']
})
export class TorneosComponent implements OnInit {
  
  public dataSource: MatTableDataSource<Torneo>;
  displayedColumns: Array<any>;
  actionsFunctions: string[];
  private isLoading : boolean;
  
  constructor(private torneoService: TorneoService,
    private router : Router,
    public dialog: MatDialog) {
      this.dataSource = new MatTableDataSource<Torneo>();
      // TODO add column ganador del torneo
      this.displayedColumns = [{valueName:'name', displayName:'Nombre'}, {valueName:'sede', displayName:'Sede'}];
      this.actionsFunctions = ['visibility', 'delete'];
    }
    
    ngOnInit() {
      this.refreshDataTable()
    }
    
    createTorneo() {
      let dialogRef = this.dialog.open(DialogTorneoComponent,
        {width: '500px', height: 'auto'});
        dialogRef.afterClosed().subscribe( data => {
          if(data) {
            this.refreshDataTable()
          }
        })
      }
      
      refreshDataTable() {
        this.torneoService.getTorneos().subscribe(res => {
          this.dataSource.data = res;
          this.isLoading = false;
        })
      }

      callAction(eventData: any): void{
        switch(eventData.action_name) {
          case 'delete':
            this.delete(eventData.element)
            break;
          case 'visibility':
            this.getRecord(eventData.element)
            break;
          default:
            console.warn(`Action ${eventData.action_name} not implemented`);
            break;
        }
      }

      getRecord(row) {
        this.router.navigateByUrl(`/torneos/${row.id}`);
      }

      delete(element: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.torneoService.remove(element.id).subscribe(() => console.log(result));
            this.refreshDataTable()
          }
        });
      }
      
    }
    