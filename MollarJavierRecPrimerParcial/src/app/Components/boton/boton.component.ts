import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';
import{PeliculaService} from '../../Services/pelicula.service';
@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  @Input() id : number;
  @Output() borrado: EventEmitter<{}>;

  constructor(private PeliculaService : PeliculaService) {
    this.borrado = new EventEmitter();
   }

  ngOnInit() {
  }

  public borrar(){    
    this.PeliculaService.Borrar(this.id)
    .then( () =>{      
      this.borrado.emit();
    });
  }

}
