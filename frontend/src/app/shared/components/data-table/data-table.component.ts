import { AfterViewInit, Component, Input, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

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

  @Input() dataSource;
  @Input() actionsFunctions: any[];
  @Input() displayedColumns: Array<any>;
  @Output('callAction') callAction: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.columnsToDisplay = [...this.displayedColumns.map(col => col.valueName), 'actions'];
  }

}
