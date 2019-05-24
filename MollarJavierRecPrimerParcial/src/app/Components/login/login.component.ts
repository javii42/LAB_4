import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from '../../Entities/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public form:FormGroup;
  // public email:AbstractControl;
  // public password:AbstractControl;
  // public submitted:boolean = false;
 // user: Usuario = new User('','');
  url: string = 'http://localhost:8080/servidor/jwt/';
  private usuarios:Array<Usuario>;
   private user:string;
   private clave:string;
   private token;
  constructor( private router: Router, private LoginService: LoginService,
    private UsuarioService: UsuarioService) {
     this.token = localStorage.getItem("token");
     console.log(this.token);
     if(this.token != "null"){
       router.navigate(["/"]);

     }else{
     }
  //  this.user.email = '';
    // console.log(this.user);

  }

  ngOnInit() {
  }
  enviar()
  {
    this.UsuarioService.Listar().subscribe(lista => {
      this.usuarios = lista;
      for(var i = 0; i < this.usuarios.length; i++){
      if(this.user == this.usuarios[i].nombre &&
       this.clave == this.usuarios[i].clave){
        var nombre=this.usuarios[i].nombre;
        var mail=this.usuarios[i].mail;
        var clave=this.usuarios[i].clave;
        var perfil=this.usuarios[i].perfil;
        var json = '[{"nombre":"'+nombre+'", "mail":"'+mail+'", "perfil":"'+perfil+'"}]';
        console.log(json);

        this.LoginService.CrearToken(JSON.parse(json)).then(data=>{
          localStorage.setItem("token",data.toString());
          localStorage.setItem("user",json);
           this.router.navigate(["/"]);

        });
      }
    }
    });
    /*console.log(this.usuarios);
    for(var i = 0; i < this.usuarios.length; i++){
      if(this.user == this.usuarios[i].nombre &&
       this.clave == this.usuarios[i].clave){
          console.log(this.usuarios[i]);
      }
    }*/
    //this.LoginService.CrearToken()
  }


}
