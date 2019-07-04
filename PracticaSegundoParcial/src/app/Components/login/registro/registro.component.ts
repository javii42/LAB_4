import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';import { Registro }
 from 'src/app/Common/Registro';
import { UserService } from './../../../Services/user.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroUsuarioComponent extends Registro implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) {
    super();
    
    this.resetForm();
  }

  ngOnInit() {
  }


  resetForm() {
	    this.form = this.fb.group({
	      mail: ['', Validators.required],
	      clave: ['', Validators.required],
	      nombre: ['', Validators.required],
	      perfil: ['Administrador'],
	      sexo: ['H']


	  	});
	}


  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const mail = this.form.get('mail').value;
      const clave = this.form.get('clave').value;
      const nombre = this.form.get('nombre').value;
      const perfil = this.form.get('perfil').value;
      const sexo = this.form.get('sexo').value;

      this.userService.Registrar(mail,nombre,perfil,sexo,clave)
        .then(
          response => {
            if (response['Estado'] === 'OK') {
              this.success = true;
              this.resetForm();
              // this.form.get('tipo').setValue('Socio');
              // this.captcha.reloadCaptcha();
              // this.captcha.resetCaptcha();
              this.registradoCorrectamente.emit();
            } else {
              this.error = true;
              this.errorMessage = response['Mensaje'];
            }
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = error['Mensaje'];
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
   }
  }

}
