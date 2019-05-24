import { Component,Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {UsuarioService} from '../../Services/usuario.service';
import{Pelicula} from '../../Entities/pelicula';
import{Usuario} from '../../Entities/usuario';
import{RelacionClaves} from '../../Entities/relacion-claves';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @Output() agregadoNuevo : EventEmitter<{}>
  @Output() resultadoBuscar : EventEmitter<Pelicula[]>
  public error : boolean;
  public errorMessage : string;
  private usuarios:Array<Usuario>;

  public profileForm= new FormGroup({
    nombre : new FormControl(''),
    mail : new FormControl(''),
    clave : new FormControl(''),
    perfil: new FormControl('')
  });;

  constructor(private UsuarioService : UsuarioService,
    private formBuilder : FormBuilder) {
    this.error = false;

    this.agregadoNuevo = new EventEmitter<{}>();
    this.resultadoBuscar = new EventEmitter<Pelicula[]>();
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      nombre:[
        '',
        Validators.required
      ],
      mail: [
        '',
        Validators.required
      ],
      clave: [
        '',
        Validators.required
      ],
      perfil: [
        'admin'
      ]
    });
    
    this.profileForm.controls["perfil"].setValue("admin");
  }

  public AgregarClicked(content):void{
  }

  public onSubmit():void{    
    this.error = false;
    this.UsuarioService.Agregar(this.profileForm.value)
    .then( () =>{
      this.agregadoNuevo.emit();    
      this.profileForm.reset();   
      this.profileForm.controls["perfil"].setValue("admin");
      alert("Usuario cargado");
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.message;
    });
  }
}
