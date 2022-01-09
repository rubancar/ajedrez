import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../entidades/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private loggedUser;
  private user : Usuario;
  constructor(private usuariosService: UsuariosService,) { }

  ngOnInit() {
    this.loggedUser = localStorage.getItem("currentUser");
    if (this.loggedUser != null && this.loggedUser != ""){
      this.usuariosService.getUsuario(this.loggedUser).subscribe(user => {this.user = user});
    }
      console.log("inciando menu principal")
  }

}
