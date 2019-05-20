import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{Pelicula} from '../../Entities/pelicula';
import {PeliculaService} from '../../Services/pelicula.service';

@Component({
  selector: 'app-buscar-modelo',
  templateUrl: './buscar-modelo.component.html',
  styleUrls: ['./buscar-modelo.component.css']
})
export class BuscarModeloComponent implements OnInit {

  @Output() resultadoBuscar : EventEmitter<Pelicula[]>
  @Input() nombre : string;

  constructor(private PeliculaService : PeliculaService) {
    this.resultadoBuscar = new EventEmitter<Pelicula[]>();
   }

  ngOnInit() {
  }

  public BuscarClicked(){
    if(this.nombre == undefined || this.nombre == ""){
      this.resultadoBuscar.emit([]);
    }else{
      
    this.PeliculaService.FiltrarPorPelicula(this.nombre)
    .then(
      data => { 
        this.resultadoBuscar.emit(data)
      }
    )
    }
  }

}
