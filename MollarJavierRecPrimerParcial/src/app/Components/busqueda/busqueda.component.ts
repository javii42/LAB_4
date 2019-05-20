import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {Pelicula} from '../../Entities/pelicula';
import {DataService} from '../../Services/data.service';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  public buscado:boolean;
  public errorBusqueda:boolean;
  public peliculas:Pelicula[];
  @Output() resultadoBuscar : EventEmitter<Pelicula[]>

  constructor(private router: Router, private route: ActivatedRoute,
    private DataService:DataService) {
    this.buscado = false;
    this.errorBusqueda = false;
   }
  public FiltrarPorNombre(){
    
  console.log("Peliculas: "+ this.peliculas);
    if(this.peliculas.length == 0 || this.peliculas == undefined)
    {
      this.buscado = false;
      this.errorBusqueda = true;
    }
    else{
      this.buscado = true;
      this.errorBusqueda = false;
    }

  }

  public getData():Pelicula[]{
    var retorno:Pelicula[] = [];
    return retorno;
  }

ngOnInit() {
  this.route.queryParams.subscribe(value => this.peliculas = JSON.parse(value.params));
  this.FiltrarPorNombre();
}

}
