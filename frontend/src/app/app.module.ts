import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { LoginComponent } from './modules/login/login.component';
import { AuthService } from './services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PartidasComponent } from './modules/partidas/partidas.component';
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
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatDividerModule
} from '@angular/material';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

import { HttpClientModule } from "@angular/common/http";
import { CdkTableModule } from '@angular/cdk/table';
import { ResultadoPartidaComponent } from './modules/partidas/resultado-partida/resultado-partida.component'
import { DialogJugadorComponent } from './modules/jugadores/dialog-jugador/dialog-jugador.component';
import { EntrenadoresComponent } from './modules/entrenadores/entrenadores.component';
import { FederacionesComponent } from './modules/federaciones/federaciones.component';
import { DialogFederacionComponent } from './modules/federaciones/dialog-federacion/dialog-federacion.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthorizatedGuard } from "./guards/authorizated.guard";
import { ClubesComponent } from './modules/clubes/clubes.component';
import { DialogClubComponent } from './modules/clubes/dialog-club/dialog-club.component';
import { CalendarioEntrenamientosComponent } from './modules/calendario-entrenamientos/calendario-entrenamientos.component';
import { DialogEntrenadorComponent } from './modules/entrenadores/dialog-entrenador/dialog-entrenador.component';
import { PagenotfoundComponent } from './modules/pagenotfound/pagenotfound.component';
import { DatePipe } from '@angular/common';
import {MAT_DATE_LOCALE} from '@angular/material';
import { TorneosComponent } from './modules/torneos/torneos.component';
import { DetalleTorneoComponent } from './modules/torneos/detalle-torneo/detalle-torneo.component';
import { DialogTorneoComponent } from './modules/torneos/dialog-torneo/dialog-torneo.component';
import { JugadoresPipe } from './shared/pipes/jugadores.pipe';
import { ResultadoPartidaPipe } from './shared/pipes/resultado-partida.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PartidasComponent,
    JugadoresComponent,
    DataTableComponent,
    ConfirmationDialogComponent,
    DialogJugadorComponent,
    EntrenadoresComponent,
    FederacionesComponent,
    DialogFederacionComponent,
    ClubesComponent,
    DialogClubComponent,
    ResultadoPartidaComponent,
    DialogJugadorComponent,
    CalendarioEntrenamientosComponent,
    DialogEntrenadorComponent,
    PagenotfoundComponent,
    TorneosComponent,
    DetalleTorneoComponent,
    DialogTorneoComponent,
    JugadoresPipe,
    ResultadoPartidaPipe
  ],
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
    MatSnackBarModule
  ],
  providers: [AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, AuthorizatedGuard, DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } ], // No se requiere importar el service ya que est?? definida la inyecci??n en cada uno de los servicios
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent, 
    DialogJugadorComponent, 
    DialogFederacionComponent, 
    DialogClubComponent, 
    ResultadoPartidaComponent, 
    DialogEntrenadorComponent,
    CalendarioEntrenamientosComponent,
    DialogTorneoComponent
  ]
})
export class AppModule { }
