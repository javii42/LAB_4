import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{Vehiculo} from '../../Entities/vehiculo';
import {VehiculoService} from '../../Services/vehiculo.service';

@Component({
  selector: 'app-buscar-modelo',
  templateUrl: './buscar-modelo.component.html',
  styleUrls: ['./buscar-modelo.component.css']
})
export class BuscarModeloComponent implements OnInit {

  @Output() resultadoBuscar : EventEmitter<Vehiculo[]>
  @Input() modelo : string;

  constructor(private vehiculoService : VehiculoService) {
    this.resultadoBuscar = new EventEmitter<Vehiculo[]>();
   }

  ngOnInit() {
  }

  public BuscarClicked(){
    if(this.modelo == undefined || this.modelo == ""){
      this.resultadoBuscar.emit([]);
    }else{
      
    this.vehiculoService.FiltrarPorModelo(this.modelo)
    .then(
      data => { 
        this.resultadoBuscar.emit(data)
      }
    )
    }
  }

}
