import { Component, OnInit } from '@angular/core';
import { TorneoService } from 'src/app/services/torneo.service'
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Torneo } from 'src/app/shared/entidades/torneo';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogTorneoComponent } from './dialog-torneo/dialog-torneo.component';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss']
})
export class TorneosComponent implements OnInit {
  
  public dataSource: MatTableDataSource<Torneo>;
  displayedColumns: string[];
  
  constructor(private torneoService: TorneoService,
    private router : Router,
    public dialogo: MatDialog) {
      this.dataSource = new MatTableDataSource<Torneo>();
      // this.actionsFunctions = ['edit', 'delete'];
      // this.displayedColumns = ['sede', 'jugador1', 'jugador2', 'fecha'];
      this.displayedColumns = ['nombre', 'sede'];
    }
    
    ngOnInit() {
      this.refreshDataTable()
    }
    
    createTorneo() {
      let dialogo = this.dialogo.open(DialogTorneoComponent,
        {width: '500px', height: '450px'});
        dialogo.afterClosed().subscribe( data => {
          if(data) {
            this.refreshDataTable()
          }
        })
      }
      
      getRecord(row) {
        this.router.navigateByUrl(`/torneos/${row.id}`);
      }

      refreshDataTable() {
        this.torneoService.getTorneos().subscribe(res => {
          console.log(res);
          this.dataSource.data = res;
        })
      }
      
    }
    