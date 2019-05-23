import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {ActorService} from '../../Services/actor.service';
import {RelacionService} from '../../Services/relacion.service'
@Component({
  selector: 'app-boton-cliente',
  templateUrl: './boton-cliente.component.html',
  styleUrls: ['./boton-cliente.component.css']
})
export class BotonClienteComponent implements OnInit {

  @Input() id : number;
  @Output() borrado: EventEmitter<{}>;

  constructor(private ActorService : ActorService,
    private RelacionService:RelacionService) {
    this.borrado = new EventEmitter();
   }

  ngOnInit() {
  }

  public borrar(){   
      this.RelacionService.BorrarIDActor(this.id)
      .then(()=>{

      });    
    this.ActorService.Borrar(this.id)
    .then( () =>{      
      this.borrado.emit();
    });
  }


}
