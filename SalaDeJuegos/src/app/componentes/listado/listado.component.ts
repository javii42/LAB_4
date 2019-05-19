import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;

  constructor() {
    
  }
  
  ngOnInit() {
    
  }

  llamaService(){
  }

  llamaServicePromesa(){
  }
}
