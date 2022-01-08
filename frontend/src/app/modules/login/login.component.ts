import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../shared/entidades/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  user : Usuario

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public onSubmit(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){

      this.user = new Usuario();
      this.user = this.loginForm.value;

      console.log(this.user);

      this.loginService.login(this.user).subscribe(
        usuario => {this.user = usuario;},
        () => this.processLogin(this.user)
      )
    }
  }

  private processLogin(usuario: any){

    if(usuario.mensaje != null){
      this.error.message = usuario.mensaje;
    }else{
      localStorage.setItem("currentUser", usuario.usuario)
      this.router.navigate(['']);
    }
  }
}
