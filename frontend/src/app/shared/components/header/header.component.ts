import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../entidades/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private loggedUser;
  private user : Usuario;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private usuariosService: UsuariosService,private router: Router) { }

  ngOnInit() {
    this.loggedUser = localStorage.getItem("currentUser");
    if (this.loggedUser != null && this.loggedUser != ""){
      this.usuariosService.getUsuario(this.loggedUser).subscribe(user => {this.user = user});
    }
      console.log("inciando menu principal")
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout(){
    localStorage.setItem("currentUser", "");
    this.router.navigate(['/login']);
  }

}
