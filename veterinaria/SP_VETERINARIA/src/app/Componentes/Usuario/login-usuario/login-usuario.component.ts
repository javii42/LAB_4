import { Router } from '@angular/router';
import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  public form: FormGroup;
  public error: boolean;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      tipo: ['Cliente', Validators.required]
    });
  }

  ngOnInit() {
    this.router.navigate(['/']);
  }

  CargarDefault(tipo: string) {
    let dataLogin: Object = null;
    switch (tipo) {
      case 'A':
        dataLogin = {
          mail: 'administrador@gmail.com',
          clave: '123',
          tipo: 'Administrador'
        };
        this.form.setValue(dataLogin);
        break;
      case 'C':
        dataLogin = {
          mail: 'cliente@gmail.com',
          clave: '123',
          tipo: 'Cliente'
        };
        this.form.setValue(dataLogin);
        break;
    }
  }

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    if (this.form.valid) {
      const mail: string = this.form.get('mail').value;
      const	clave: string = this.form.get('clave').value;
      const tipo: string = this.form.get('tipo').value;

      console.log(mail + clave + tipo);

      this.authService.loguear(mail, clave, tipo)
        .then(
          response => {
            console.log(response);
              this.error = true;
              this.errorMessage = response['Mensaje'];

              console.log(response['Mensaje']);
          }
        )
        .catch(
          response => {
            this.error = true;
            this.errorMessage = response['Mensaje'];

            console.log(response['Mensaje']);
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

}
