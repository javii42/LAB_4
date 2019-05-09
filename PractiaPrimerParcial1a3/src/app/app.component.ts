import { Component,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import{Vehiculo} from './Entities/vehiculo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public buscado:boolean;
  public errorBusqueda:boolean;
  @Output() resultadoBuscar : EventEmitter<Vehiculo[]>
  title = 'PracticaPrimerParcial';
  
  private vehiculos:Array<Vehiculo>;

  constructor(private router: Router, private route: ActivatedRoute){
    this.buscado = false;
    this.errorBusqueda = false;
  }
  public FiltrarPorModelo(value: Vehiculo[]){
    if(value.length == 0)
    {
      this.buscado = false;
      this.errorBusqueda = true;
    }
    else{
      this.buscado = true;
      this.errorBusqueda = false;
      this.vehiculos = value;
    }

  }
}
