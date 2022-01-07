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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
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
  MatTableModule,
  MatDividerModule
} from '@angular/material';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

import { HttpClientModule } from "@angular/common/http";
import { CdkTableModule } from '@angular/cdk/table';
import { DetallePartidaComponent } from './modules/detalle-partida/detalle-partida.component';
import { ResultadoPartidaComponent } from './modules/resultado-partida/resultado-partida.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PartidasComponent,
    JugadoresComponent,
    DataTableComponent,
    ConfirmationDialogComponent,
    ResultadoPartidaComponent,
    DetallePartidaComponent
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

    // Modulos para implementar DataTable
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService], // No se requiere importar el service ya que está definida la inyección en cada uno de los servicios
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent,DetallePartidaComponent,ResultadoPartidaComponent]
})
export class AppModule { }
