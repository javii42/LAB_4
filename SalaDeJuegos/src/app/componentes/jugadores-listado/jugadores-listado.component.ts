import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
    constructor() {
      this.listado = JSON.parse(localStorage.getItem('Usuarios'));
    }
    


  ngOnInit() {
  }


  TraerTodos(){
    //alert("totos");
  }
  TraerGanadores(){
  }
  TraerPerdedores(){
  }

}
