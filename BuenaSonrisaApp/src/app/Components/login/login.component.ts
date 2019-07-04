import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public form: FormGroup;
  public error: boolean;
  public errorMessage: string;
  public reg:boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      pass: ['', Validators.required],
      perfil: ['Cliente', Validators.required]
    });
    this.reg = false;
  }

  ngOnInit() {
   // this.router.navigate(['/']);
  }

  CargarDefault(tipo: string) {
    console.log(tipo);
    let dataLogin: Object = null;
    switch (tipo) {
      case 'Cliente':
        dataLogin = {
          user: 'cliente@gmail.com',
          pass: '123456',
          name: 'Pedro',
          perfil: 'Cliente'
        };
        this.form.setValue(dataLogin);
        break;
      case 'Especialista':
        dataLogin = {
          user: 'especialista@gmail.com',
          pass: '123456',
          name: 'Ariel',
          perfil: 'Especialista'
        };
        this.form.setValue(dataLogin);
        break;
      case 'Recepcionista':
        dataLogin = {
          user: 'recepcionista@gmail.com',
          pass: '123456',
          name: 'Juan',
          perfil: 'Recepcionista'
        };
        this.form.setValue(dataLogin);
        break;
      case 'Administrador':
        dataLogin = {
          user: 'admin@gmail.com',
          pass: '123456',
          name: 'Javier',
          perfil: 'Administrador'
        };
        this.form.setValue(dataLogin);
        break;
    }
  }

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    if (this.form.valid) {
      const mail: string = this.form.get('user').value;
      const pass: string = this.form.get('pass').value;
      const name: string = this.form.get('name').value;
      const perfil: string = this.form.get('perfil').value;
      
      this.authService.loginFb(mail,pass);
    /*  this.authService.loguear(mail, name, pass, perfil)
        .then(
          response => {
            console.log(response);
              this.error = true;
              this.errorMessage = response['Mensaje'];
          }
        )
        .catch(
          response => {
            this.error = true;
            this.errorMessage = response['Mensaje'];
          }
        );*/
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

 /* public registrar(){
      if(!this.reg){
        this.reg = true;
      }
  }*/

}
