import { User } from './../../../Model/User';
import { EstadisticaService } from './../../../Services/estadistica.service';
import { Component, OnInit } from '@angular/core';
import { Zapato } from 'src/app/Model/Zapato';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  listaZapatos: Zapato[];
  form: FormGroup;

  constructor(private estadisticaService: EstadisticaService, private fb: FormBuilder) {
    this.form = this.fb.group({
      local: ['1'],
      repetidos: ['Todos']
    });

    this.onChanges();
  //  this.cargarLista();
  }

  ngOnInit() {
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
   //   this.cargarLista();
    });
  }

 /* cargarLista() {
    const local = this.form.get('local').value;
    const repetidos = this.form.get('repetidos').value;
    if (local != 'Todos') {
      this.estadisticaService.ZapatosPorLocal(local).then(response => {
        this.listaZapatos = response;
      });
    } else {
      this.estadisticaService.ZapatosRepetidos(repetidos).then(response => {
        this.listaZapatos = response;
      })
    }

  }*/

}
