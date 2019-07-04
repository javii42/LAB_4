import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { Mascota } from './../Model/Mascota';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(public miHttp: HttpBase) {
  }

  public Listar(): Observable<Mascota[]> {
    return this.miHttp.httpGetO<Mascota[]>('/Mascotas/');
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

  public Registrar(animal: string, raza: string, nombre: string, edad: number, duenio: string, foto): Promise<Object> {
    const request: Object = {
      animal: animal,
      raza: raza,
      nombre: nombre,
      edad: edad,
      duenio: duenio,
      foto: foto
    };
    return this.miHttp.httpPostP('/Mascotas/', request);
  }
}
