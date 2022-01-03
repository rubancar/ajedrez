import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PartidasComponent } from './modules/partidas/partidas.component';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';

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