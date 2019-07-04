import { ZapatoService } from './../../../Services/zapato.service';
import { Zapato } from './../../../Model/Zapato';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listaZapatos: Zapato[];

  constructor(private zapatoService: ZapatoService) {
    this.cargarLista();
   }

  ngOnInit() {
  }

  cargarLista() {
    this.zapatoService.Listar().subscribe( response => {
      this.listaZapatos = response;
    });
  }

}
