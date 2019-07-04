import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { Zapato } from './../Model/Zapato';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZapatoService {

  constructor(public miHttp: HttpBase) {
  }

  public Listar(): Observable<Zapato[]> {
    return this.miHttp.httpGetO<Zapato[]>('/Materias/');
  }

  // public ListarPorCliente(idCliente: number): Observable<Zapato[]> {
  //   return this.Listar().pipe(
  //     map(response => {
  //       return response.filter( element => {
  //         console.log(idCliente);
  //         console.log(element.idCliente);
  //         return element.idCliente === idCliente;
  //       });
  //     }));
  // }

  public Registrar(nombre: string, cuatrimestre: string, cupos: string, profesor: number): Promise<Object> {
    const request: Object = {
      nombre: nombre,
      cuatrimestre: cuatrimestre,
      cupos: cupos,
      profesor: profesor
    };
    return this.miHttp.httpPostP('/Materias/', request);
  }
}
