import { User } from './../../../../Model/User';
import { Component, OnInit, Input } from '@angular/core';
import {ClienteService } from './../../../../Services/cliente.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  listaZapatos: User[];

  constructor(private zapatoService: ClienteService) {
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
