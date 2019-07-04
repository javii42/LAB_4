import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.css']
})
export class AtenderTurnoComponent implements OnInit {

	public turnos; 
  constructor(private firestore:AngularFirestore,) {
  	this.turnos = []; }

  ngOnInit() {
  	 this.firestore.collection('turnos').snapshotChanges().subscribe(res=>{
  	 	res.forEach(r =>{
  	 		console.log(r.payload.doc.data());
  	 		if(r.payload.doc.data()["estado"] == 'P'){
  	 			this.turnos.push({
  	 				id: r.payload.doc.id,
  	 				data:r.payload.doc.data()
  	 			});

  	 		}
  	 	})
  	 });
  }

  recargar(){
  	this.turnos = [];

  }
  atender(id:string,dni:string,fecha:string,hora:string){
  	const data: Object = {
  		dni:dni,
  		fecha:fecha,
  		hora:hora,
  		estado: 'R'
  	};
  	this.firestore.collection('turnos').doc(id).set(data);
  	location.reload();
  }

}
