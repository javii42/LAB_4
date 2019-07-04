import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from './../../../Services/usuario.service';
import { MascotaService } from './../../../Services/mascota.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Registro } from 'src/app/Common/Registro';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent extends Registro implements OnInit {

  private idUsuario: number;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private jwt: JwtHelperService,
    private mascotaService: MascotaService) {
    super();

    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    console.log(tokenInfo);
    this.idUsuario = tokenInfo['id'];

    this.form = this.fb.group({
      name: ['', Validators.required],
      espacio: [1, Validators.required],
    });

    //this.CargarPrecio();
  }

  ngOnInit() {
  }

  /*CargarPrecio() {
    this.usuarioService.ListarPorID(this.idUsuario).subscribe( response => {
      console.log(response);
      if (response.promocion === 1) {
        this.precio =  0;
      } else {
        this.precio = 300;
      }
    });
  }*/

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const name = this.form.get('name').value;
      const espacio = this.form.get('espacio').value;

      // this.servicioService.Registrar(espacio, this.idCliente, name, this.precio)
      //   .then(
      //     response => {
      //       if (response['Estado'] === 'OK') {
      //         this.success = true;
      //         this.form.reset();
      //         // this.form.get('tipo').setValue('Socio');
      //         // this.captcha.reloadCaptcha();
      //         // this.captcha.resetCaptcha();
      //         this.registradoCorrectamente.emit();
      //         if (this.precio === 0) {
      //           this.clienteService.ActualizarPromocion(this.idCliente, 0).then( () => {
      //             this.CargarPrecio();
      //           });
      //         }
      //       } else {
      //         this.error = true;
      //         this.errorMessage = response['Mensaje'];
      //       }
      //     }
      //   )
      //   .catch(
      //     error => {
      //       this.error = true;
      //       this.errorMessage = error['Mensaje'];
      //     }
      //   );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }
}
