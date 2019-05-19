import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  public claveIncorrecta:boolean;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  public usuarios;

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.claveIncorrecta = false;
      this.progreso=0;
      this.ProgresoDeAncho="0%";
      if (localStorage.getItem('Usuarios')) {
        this.usuarios = JSON.parse(localStorage.getItem('Usuarios'));
    }
    else {
        var usuarios = [{
            "correo": "javier@gmail.com",
            "clave": "1234",
            "nombre": "Javier",
            "apellido": "Mollar",
            "legajo": 12345,
            "perfil": "superAdmin"
        },
        {
            "correo": "carlos@hotmail.com",
            "clave": "1234",
            "nombre": "Carlos",
            "apellido": "Pena",
            "legajo": 675,
            "perfil": "invitado"
        },
        {
            "correo": "ale@gmail.com",
            "clave": "12345",
            "nombre": "Ale",
            "apellido": "Chena",
            "legajo": 123456,
            "perfil": "admin"
        },
        {
            "correo": "stan@yahoo.com",
            "clave": "1234",
            "nombre": "Stan",
            "apellido": "Lee",
            "legajo": 6546456,
            "perfil": "admin"
        },
        {
            "correo": "roberto@gmail.com",
            "clave": "1234",
            "nombre": "Roberto",
            "apellido": "Melo",
            "legajo": 600600,
            "perfil": "invitado"
        },]

        localStorage.setItem('Usuarios', JSON.stringify(usuarios));
      //  console.log(localStorage.getItem('Usuarios'));

  }
}

  ngOnInit() {
  }

  Entrar():boolean {
    var retorno:boolean = false;
    this.MoverBarraDeProgreso();
    for(var i = 0; i < this.usuarios.length; i++){
      if(this.usuario == this.usuarios[i].correo
        && this.clave == this.usuarios[i].clave){
          localStorage.setItem('UsuarioLogueado',JSON.stringify(this.usuarios[i]));
          this.router.navigate(['/Principal']);
          retorno = true;
          break;
        }
    }
    
    this.claveIncorrecta = true;
    this.logeando=true;
    return retorno;
  }
  MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="NSA spy..."; 
    //this.logeando=true;
  }

  datos(){
    
    this.usuario = 'javier@gmail.com';
    this.clave= '1234';
  }

}
