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
  public error: "";
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
        data => {
          if(data.mensaje != null){
            this.error = data.mensaje;
            this.user = null;
          }else{
            this.user = data;
          }
          this.processLogin(this.user)
        }
      )
    }
  }

  private processLogin(user : Usuario){
    if(user != null){
      localStorage.setItem("currentUser", user.usuario);
      this.router.navigate(['']);
    }else{
      localStorage.setItem("currentUser", "");
    }
  }
}
