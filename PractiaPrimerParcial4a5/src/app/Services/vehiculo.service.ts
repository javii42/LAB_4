import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Vehiculo } from '../Entities/Vehiculo';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(public http:HttpBaseService<Vehiculo>) { }
  

  public Listar(): Observable<Vehiculo[]> {
    return this.http.httpGetO('Vehiculos/listar');
  }

  public Agregar(object : JSON){
    return this.http.httpPostP('Vehiculos/registrar',object);
  }

  public Borrar(id: number) : Promise<any> {
    return this.http.httpDeleteP('Vehiculos/' + id);
  }

  public FiltrarPorModelo(modelo : string){
    return this.Listar().pipe<Vehiculo[]>(
      map( vehiculos => {
        if(modelo === undefined || modelo === ''){
          return vehiculos;
        }
        else{
          return (vehiculos as Vehiculo[]).filter( objeto => objeto.modelo.toLowerCase() === modelo.toLowerCase());
        }
      })
    ).toPromise();
  }
}
