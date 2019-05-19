
import { Component, OnInit , Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listado;
 partidas;


  constructor() {
    this.partidas = JSON.parse(localStorage.getItem('partidas'));
    this.listado = Object.keys(JSON.parse(localStorage.getItem('partidas')));
    console.info(this.listado);
    console.log(this.partidas);
   }

  ngOnInit() {

  }

  ver() {
    console.info(this.listado);
  }

}
