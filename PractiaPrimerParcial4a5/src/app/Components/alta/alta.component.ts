import { Component,Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {VehiculoService} from '../../Services/vehiculo.service';
import{Vehiculo} from '../../Entities/vehiculo';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  @Output() agregadoNuevo : EventEmitter<{}>
  @Output() resultadoBuscar : EventEmitter<Vehiculo[]>
  public error : boolean;
  public errorMessage : string;

  public profileForm= new FormGroup({
    modelo : new FormControl(''),
    marca : new FormControl(''),
    cantPuertas: new FormControl('')
  });;

  constructor(private VehiculosService : VehiculoService,private formBuilder : FormBuilder) { 
    this.error = false;

    this.agregadoNuevo = new EventEmitter<{}>();
    this.resultadoBuscar = new EventEmitter<Vehiculo[]>();
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      modelo:[
        '',
        Validators.required
      ],
      cantPuertas: [
        "Tres"
      ],
      marca: [
        '',
        Validators.required
      ]
    });
    
    this.profileForm.controls["cantPuertas"].setValue("Tres");
  }

  public AgregarClicked(content):void{
  }

  public onSubmit():void{    
    this.error = false;
    this.VehiculosService.Agregar(this.profileForm.value)
    .then( () =>{
      this.agregadoNuevo.emit();
      this.profileForm.reset();      
      this.profileForm.controls["cantPuertas"].setValue("3");
      alert("Vehiculo cargado");
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.message;
    })
  } 
}
