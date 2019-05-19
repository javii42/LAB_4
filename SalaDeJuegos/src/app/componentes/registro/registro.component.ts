import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
 
  formRegistro:FormGroup=new FormGroup({
   usuario : new FormControl(''),
   password : new FormControl(''),
   confirmPsw : new FormControl('')

  });

  constructor( private miConstructor:FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  

  ngOnInit() {
    this.formRegistro = this.miConstructor.group({
      usuario:['',Validators.required],
      password:['',Validators.required],
      confirmPass:['',Validators.required]
    });
  }

  checkPass():boolean{
    var retorno = false;
  //  console.log(this.formRegistro.controls);
    let pass = "";//this.formRegistro.controls.password.value;
    let confirmPass =""; //this.formRegistro.controls.confirmPass.value;
    if(pass == confirmPass){
      retorno = true;
    }
    return retorno;
  }

  registro()
  {
    
    let pass = this.formRegistro.controls.password.value;
    let confirmPass =this.formRegistro.controls.confirmPass.value;

    if(pass == confirmPass){
      var usuarios = JSON.parse(localStorage.getItem('Usuarios'));
      var usuarioRepetido:boolean = false;
      for(var i=0; i < usuarios.length;i++){
        if(this.formRegistro.controls.usuario.value
          == usuarios[i].correo){
            usuarioRepetido = true;
            break;
          }
      }
      if(!usuarioRepetido){
        usuarios.push({
          "correo": this.formRegistro.controls.usuario.value,
          "clave": this.formRegistro.controls.password.value,
          "nombre": "NN",
          "apellido": "nn",
          "legajo": 12345,
          "perfil": "admin"
      });
        localStorage.setItem('Usuarios',JSON.stringify(usuarios));
        document.getElementById('id01').style.display='none';
        this.router.navigate(['/Login']);

      }else{
        alert("el usuario ya existe");
      }

    }
  }
}
