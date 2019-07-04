import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { Usuario } from './../Models/Usuario';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import {AuthService} from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(public miHttp: HttpBase, private firestore:AngularFirestore,
    private AuthService:AuthService) {
  }

  public Listar(): Observable<Usuario[]> {
    return this.miHttp.httpGetO<Usuario[]>('/Materias/');
  }

  // public ListarPorCliente(idCliente: number): Observable<Usuario[]> {
  //   return this.Listar().pipe(
  //     map(response => {
  //       return response.filter( element => {
  //         console.log(idCliente);
  //         console.log(element.idCliente);
  //         return element.idCliente === idCliente;
  //       });
  //     }));
  // }

  public Registrar(nombre: string, apellido: string, mail: string, dni: number,
  	tipo: string, pass: string, file): Promise<Object> {
    const request: Object = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      dni: dni,
      tipo: tipo
    };

    this.AuthService.signup(mail,pass);
    return this.firestore.collection('usuarios').add(request);
  }
}