import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PartidasComponent } from './modules/partidas/partidas.component';
import { JugadoresComponent } from './modules/jugadores/jugadores.component';
import { EntrenadoresComponent } from './modules/entrenadores/entrenadores.component';
import { FederacionesComponent } from './modules/federaciones/federaciones.component';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { ClubesComponent } from './modules/clubes/clubes.component'; 
import { PagenotfoundComponent } from './modules/pagenotfound/pagenotfound.component';
import { TorneosComponent } from './modules/torneos/torneos.component';
import { DetalleTorneoComponent } from './modules/torneos/detalle-torneo/detalle-torneo.component';



const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  canActivate: [ AuthorizatedGuard ],
  children: [{
    path: '',
    component: DashboardComponent,
    canActivate: [ AuthorizatedGuard ]
  }, {
    path: 'partidas',
    component: PartidasComponent,
    canActivate: [ AuthorizatedGuard ]
  }, {
    path: 'jugadores',
    component: JugadoresComponent,
    canActivate: [ AuthorizatedGuard ]
  }, {
    path: 'entrenadores',
    component: EntrenadoresComponent,
    canActivate: [ AuthorizatedGuard ]
  }, {
    path: 'federaciones',
    component: FederacionesComponent,
    canActivate: [ AuthorizatedGuard ]
  }, {
    path: 'torneos',
    component: TorneosComponent,
    canActivate: [ AuthorizatedGuard ]
  },{
    path: 'torneos/:id',
    component: DetalleTorneoComponent,
    canActivate: [ AuthorizatedGuard ]
  },
  {
    path: 'clubes',
    component: ClubesComponent,
    canActivate: [ AuthorizatedGuard ]
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
