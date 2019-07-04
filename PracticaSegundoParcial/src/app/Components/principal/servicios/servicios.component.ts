import { JwtHelperService } from '@auth0/angular-jwt';
import { Zapato } from './../../../Model/Zapato';
import { ZapatoService } from './../../../Services/zapato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  listaZapatos: Zapato[];
  private idCliente: number;

  constructor(private zapatoService: ZapatoService, private jwt: JwtHelperService) {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    this.idCliente = tokenInfo['id'];
    this.cargarLista();
  }

  ngOnInit() {
  }

  cargarLista() {
    // this.zapatoService.ListarPorCliente(this.idCliente).subscribe( response => {
    //   this.listaZapatos = response;
    // });
  }

}
