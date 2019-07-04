import { Component, OnInit, Input } from '@angular/core';
import { Zapato } from './../../../../../Model/Zapato';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() zapato: Zapato;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
