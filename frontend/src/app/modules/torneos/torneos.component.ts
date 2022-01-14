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
  displayedColumns: string[];
  actionsFunctions: string[];
  
  constructor(private torneoService: TorneoService,
    private router : Router,
    public dialog: MatDialog) {
      this.dataSource = new MatTableDataSource<Torneo>();
      this.actionsFunctions = ['dehaze', 'delete'];
      // TODO add column ganador del torneo
      this.displayedColumns = ['name', 'sede'];
    }
    
    ngOnInit() {
      this.refreshDataTable()
    }
    
    createTorneo() {
      let dialogRef = this.dialog.open(DialogTorneoComponent,
        {width: '500px', height: '450px'});
        dialogRef.afterClosed().subscribe( data => {
          if(data) {
            this.refreshDataTable()
          }
        })
      }
      
      refreshDataTable() {
        this.torneoService.getTorneos().subscribe(res => {
          this.dataSource.data = res;
        })
      }

      callAction(eventData: any): void{
        switch(eventData.action_name) {
          case 'delete':
            this.delete(eventData.element)
            break;
          case 'dehaze':
            this.getRecord(eventData.element)
            console.log("elemnto del boton", eventData.element)
            break;
          // case 'edit':
          //   this.edit(eventData.element)
          //   break;
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
    