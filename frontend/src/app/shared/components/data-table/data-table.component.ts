import { AfterViewInit, Component, Input, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { JugadoresService } from 'src/app/services/jugadores.service';
import { Jugador } from '../../entidades/jugador';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //public 
  public columnsToDisplay: string[];

  public columnsFilters = {};

  @Input() dataSource: MatTableDataSource<Jugador>;
  @Input() actionsFunctions: any[];
  @Input() displayedColumns: string[];
  @Output('callAction') callAction: EventEmitter<any> = new EventEmitter();

  constructor(private jugadorService: JugadoresService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<Jugador>();
  }
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.columnsToDisplay = [...this.displayedColumns, 'actions'];
  }

}
