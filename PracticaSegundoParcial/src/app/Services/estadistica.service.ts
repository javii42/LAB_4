import { User } from './../Model/User';
import { Zapato } from 'src/app/Model/Zapato';
import { ZapatoService } from 'src/app/Services/zapato.service';
import { Injectable, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private zapatoService: ZapatoService) { }


 /*public ZapatosPorLocal(local): Promise<Zapato[]> {
    return this.zapatoService.Listar().toPromise().then(response => {
      if (local != 'Todos') {
        response = response.filter(zapato => {
          return zapato.local == local;
        });
      }
      return response;
    });
  }

  public ZapatosRepetidos(opcion): Promise<Zapato[]> {
    return this.zapatoService.Listar().toPromise().then(response => {
      response.forEach(zapato => {
        zapato.repetido = false;
        response.forEach(z => {
          if (z.id != zapato.id && z.codigo == zapato.codigo) {
            zapato.repetido = true;
          }
        })
      });

      if (opcion == 'NoRepetidos') {
        response = response.filter(zapato => {
          return !zapato.repetido;
        });
      }
      else if (opcion == 'Repetidos'){
        response = response.filter(zapato => {
          return zapato.repetido;
        });
      }
      return response;
    });
  }*/

}
