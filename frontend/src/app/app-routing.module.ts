import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PartidasComponent } from './modules/partidas/partidas.component';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';
import { ClubesComponent } from './modules/clubes/clubes.component';
import { PagenotfoundComponent } from './modules/pagenotfound/pagenotfound.component';

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
  }, {
    path: 'clubes',
    component: ClubesComponent
  }]
},
{
  path: 'login',
  component: LoginComponent
},
//Wild Card Route for 404 request
{ path: '**', pathMatch: 'full', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
