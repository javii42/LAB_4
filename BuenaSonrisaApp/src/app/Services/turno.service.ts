import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { Turno } from './../Models/Turno';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import {AuthService} from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

	constructor(public miHttp: HttpBase, private firestore:AngularFirestore,
    private AuthService:AuthService) {
  }

  public Registrar(dni:number,fecha:string,hora:string):any {
  	let usuario;
  	let validado:boolean = false;
  	let termino:boolean = false;
    const request: Object = {
      dni: dni,
      fecha: fecha,
      hora: hora
    };
    this.firestore.collection('usuarios').snapshotChanges().subscribe(res=>{
    	res.forEach(r =>{
    		usuario = r.payload.doc.data();
    		console.log(usuario);
    		if(usuario["tipo"] == "Cliente" && usuario["dni"] == dni){
    			console.log("ok");
				this.firestore.collection('turnos').add(request);
				return true;
    		}
    	})
    },err=>{
    	return false;
    },
    ()=>{

    });
}
}