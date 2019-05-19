import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import{Vehiculo} from '../../Entities/vehiculo';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() resultadoBuscar : EventEmitter<Vehiculo[]>
  public modelo: String;
  constructor() { 
    this.resultadoBuscar = new EventEmitter<Vehiculo[]>();
  }

  ngOnInit() {
  }
  
  public BuscarClicked(value : Vehiculo[]){
    this.resultadoBuscar.emit(value);
    console.log(value);
  }

}
