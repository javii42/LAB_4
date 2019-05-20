import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ActorService} from '../../Services/actor.service';
import{Actor} from '../../Entities/actor';

@Component({
  selector: 'app-alta-actor',
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.css']
})
export class AltaActorComponent implements OnInit {
  @Output() agregadoNuevo : EventEmitter<{}>
  @Output() resultadoBuscar : EventEmitter<Actor[]>
  public error : boolean;
  public errorMessage : string;

  public profileForm= new FormGroup({
    nombre : new FormControl(''),
    apellido : new FormControl(''),
    nacionalidad: new FormControl(''),
    fecha_nacimiento: new FormControl('')
  });;

  constructor(private ActorService : ActorService,private formBuilder : FormBuilder) { 
    this.error = false;

    this.agregadoNuevo = new EventEmitter<{}>();
    this.resultadoBuscar = new EventEmitter<Actor[]>();
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      nombre:[
        '',
        Validators.required
      ],
      apellido: [
        '',
        Validators.required
      ],
      nacionalidad: [
        '',
        Validators.required
      ],
      fecha_nacimiento: [
        '',
        Validators.required
      ]
    });
    
  }

  public AgregarClicked(content):void{
  }

  public onSubmit():void{    
    this.error = false;
    this.ActorService.Agregar(this.profileForm.value)
    .then( () =>{
      this.agregadoNuevo.emit();
      this.profileForm.reset();   
      alert("Actor cargado");
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.message;
    })
  } 

}
