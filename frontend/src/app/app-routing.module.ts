import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PartidasComponent } from './modules/partidas/partidas.component';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { DetallePartidaComponent } from './modules/detalle-partida/detalle-partida.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  //canActivate: [AuthGuard],
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'partidas',
    component: PartidasComponent
  }, {
    path: 'partidas/:id',
    component: DetallePartidaComponent
  }, {
    path: 'jugadores',
    component: JugadoresComponent
  }]
},
{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
