import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ver-resenia',
  templateUrl: './ver-resenia.component.html',
  styleUrls: ['./ver-resenia.component.css']
})
export class VerReseniaComponent implements OnInit {
	public turnos;
  constructor(private firestore:AngularFirestore) { 
  	this.turnos = [];
  }

  ngOnInit() {
     var token = localStorage.getItem("token");
     var tokenInfo = JSON.parse(token);
     console.log(tokenInfo);
  	 this.firestore.collection('turnos').snapshotChanges().subscribe(res=>{
  	 	res.forEach(r =>{
  	 		console.log(r.payload.doc.data());
  	 		if(r.payload.doc.data()["estado"] == 'T' &&
          tokenInfo["dni"] == r.payload.doc.data()["dni"]){
  	 			this.turnos.push({
  	 				id: r.payload.doc.id,
  	 				data:r.payload.doc.data()
  	 			});

  	 		}
  	 	})
  	 });
  }

}
