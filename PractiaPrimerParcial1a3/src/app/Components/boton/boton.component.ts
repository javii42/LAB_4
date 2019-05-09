import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';
import{VehiculoService} from '../../Services/vehiculo.service';
@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  @Input() id : number;
  @Output() borrado: EventEmitter<{}>;

  constructor(private vehiculosService : VehiculoService) {
    this.borrado = new EventEmitter();
   }

  ngOnInit() {
  }

  public borrar(){    
    this.vehiculosService.Borrar(this.id)
    .then( () =>{      
      this.borrado.emit();
    });
  }

}
