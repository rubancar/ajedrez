import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from 'src/app/layouts/default/default.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatListModule,
  MatGridListModule,
  MatToolbarModule,
  MatRadioModule,
  MatCheckboxModule,
  //MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatDividerModule
} from '@angular/material';
import { JugadoresComponent } from './jugadores.component';
import { DialogJugadorComponent } from './dialog-jugador/dialog-jugador.component'; 

import { HttpClientModule } from "@angular/common/http";
import { CdkTableModule } from '@angular/cdk/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterTestingModule } from '@angular/router/testing';
import {JugadoresService} from '../../services/jugadores.service';
import { PartidasComponent } from '../partidas/partidas.component';
import { EntrenadoresComponent } from '../entrenadores/entrenadores.component';
import { FederacionesComponent } from '../federaciones/federaciones.component';
import { TorneosComponent } from '../torneos/torneos.component';
import { DetalleTorneoComponent } from '../torneos/detalle-torneo/detalle-torneo.component'
import { ClubesComponent } from '../clubes/clubes.component';
import { LoginComponent } from '../login/login.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';

describe('JugadoresComponent', () => {
  let component: JugadoresComponent;
  let fixture: ComponentFixture<JugadoresComponent>;

  beforeEach(async () => {



    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DefaultModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        HttpClientModule,
        MatDividerModule,
        MatGridListModule,
        MatToolbarModule,
        MatRadioModule,
        MatProgressSpinnerModule,
    
        // Modulos para implementar DataTable
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
    
        // DatePicker
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([{ path: 'jugadores', component: JugadoresComponent }])],
        declarations: [JugadoresComponent, DialogJugadorComponent, DetalleTorneoComponent,
          ClubesComponent, LoginComponent, PagenotfoundComponent, DataTableComponent,
        PartidasComponent, EntrenadoresComponent, FederacionesComponent, TorneosComponent ],
      providers: [{ provide: JugadoresService },
      { provide: 'baseURL', useValue: "http://localhost:4200/" }
      ]
    }).compileComponents();

    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
