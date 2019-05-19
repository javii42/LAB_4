import { Component,Output,EventEmitter, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';

import{Vehiculo} from './Entities/vehiculo';

import { trigger, transition, group, query, style, animate, state, animateChild} from '@angular/animations';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation 
  ]
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
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
