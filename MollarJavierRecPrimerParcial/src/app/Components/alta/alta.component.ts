import { Component,Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {PeliculaService} from '../../Services/pelicula.service';
import{Pelicula} from '../../Entities/pelicula';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  @Output() agregadoNuevo : EventEmitter<{}>
  @Output() resultadoBuscar : EventEmitter<Pelicula[]>
  public error : boolean;
  public errorMessage : string;

  public profileForm= new FormGroup({
    nombre : new FormControl(''),
    tipo : new FormControl(''),
    cant_publico: new FormControl(''),
    fecha_estreno: new FormControl('')
  });;

  constructor(private PeliculaService : PeliculaService,private formBuilder : FormBuilder) { 
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
      tipo: [
        "Otros"
      ],
      cant_publico: [
        '',
        Validators.required
      ],
      fecha_estreno: [
        '',
        Validators.required
      ]
    });
    
    this.profileForm.controls["cant_publico"].setValue("otros");
  }

  public AgregarClicked(content):void{
  }

  public onSubmit():void{    
    this.error = false;
    this.PeliculaService.Agregar(this.profileForm.value)
    .then( () =>{
      this.agregadoNuevo.emit();
      this.profileForm.reset();   
      this.profileForm.controls["cant_publico"].setValue("otros");
      alert("Pelicula cargada");
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.message;
    })
  } 
}
