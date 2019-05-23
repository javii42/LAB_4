import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Pelicula } from '../Entities/pelicula';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(public http:HttpBaseService<Pelicula>) { }
  

  public Listar(): Observable<Pelicula[]> {
    return this.http.httpGetO('Peliculas/listar');
  }
  public ListarID(): Observable<Pelicula[]> {
    return this.http.httpGetO('Peliculas/listarID');
  }

  public Agregar(object : JSON){
    return this.http.httpPostP('Peliculas/registrar',object);
  }

  public Borrar(id: number) : Promise<any> {
    return this.http.httpDeleteP('Peliculas/' + id);
  }

  public FiltrarPorPelicula(nombre : string){
    return this.Listar().pipe<Pelicula[]>(
      map( peliculas => {
        if(nombre === undefined || nombre === ''){
          return peliculas;
        }
        else{
          return (peliculas as Pelicula[]).filter( objeto => objeto.nombre.toLowerCase() === nombre.toLowerCase());
        }
      })
    ).toPromise();
  }
}
