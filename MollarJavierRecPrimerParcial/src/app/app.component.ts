import { Component,Output,EventEmitter, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet, NavigationExtras } from '@angular/router';

import{Pelicula} from './Entities/pelicula';
import {DataService} from './Services/data.service';
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
  title = 'PracticaPrimerParcial';
  @Output() resultadoBuscar : EventEmitter<Pelicula[]>
  private token;
  constructor(private router: Router, private route: ActivatedRoute,
    private DataService:DataService){
     this.token = localStorage.getItem("token");
     console.log(this.token);
     if(this.token != "null"){

     }else{
       router.navigate(["/login"]);
     }
  }
  public FiltrarPorNombre(value: Pelicula[]){
         var params = JSON.stringify(value);
        let navigationExtras: NavigationExtras = {
            queryParams: {
              params
            }
        };
    this.router.navigate(['busqueda'],navigationExtras);

  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
