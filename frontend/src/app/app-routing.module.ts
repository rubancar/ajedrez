import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PartidasComponent } from './modules/partidas/partidas.component';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { EntrenadoresComponent } from './modules/entrenadores/entrenadores.component';
import { FederacionesComponent } from './modules/federaciones/federaciones.component';

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
    path: 'jugadores',
    component: JugadoresComponent
  },{
    path: 'entrenadores',
    component: EntrenadoresComponent
  },{
    path: 'federaciones',
    component: FederacionesComponent
  },
]
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
