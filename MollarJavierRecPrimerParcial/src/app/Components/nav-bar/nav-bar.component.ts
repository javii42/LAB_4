import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import{Pelicula} from '../../Entities/pelicula';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() resultadoBuscar : EventEmitter<Pelicula[]>
  public nombre: String;
  constructor() { 
    this.resultadoBuscar = new EventEmitter<Pelicula[]>();
  }

  ngOnInit() {
  }
  
  public BuscarClicked(value : Pelicula[]){
    this.resultadoBuscar.emit(value);
    console.log(value);
  }

}
