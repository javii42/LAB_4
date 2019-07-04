import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { Relacion } from './../Model/Relacion';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelacionService { 
	constructor(public miHttp: HttpBase) {
  }

  public Listar(): Observable<Relacion[]> {
    return this.miHttp.httpGetO<Relacion[]>('/MateriaAlumno/');
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

  public Registrar(id_alumno: number, id_materia: number): Promise<Object> {
    const request: Object = {
      id_alumno: id_alumno,
      id_materia: id_materia
    };
    return this.miHttp.httpPostP('/MateriaAlumno/', request);
  }
}
