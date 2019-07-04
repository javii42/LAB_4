import { User } from './../../../../Model/User';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class Lista2Component implements OnInit {
  @Input() listaZapatos: User[];

  constructor() { }

  ngOnInit() {
  }

}
