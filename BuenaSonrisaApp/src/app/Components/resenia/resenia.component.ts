import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css']
})
export class ReseniaComponent implements OnInit {

	public tabla:boolean;
	public turnos;
	public dniR;
	public fechaR;
	public horaR;
	public idR;
  public form: FormGroup;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;

  constructor(private firestore:AngularFirestore,private fb: FormBuilder) { 
  	this.tabla = true;
  	this.turnos = [];
  	this.dniR = "";
  	this.fechaR = "";
    this.resetForm();
  }

  resetForm() {
    this.form = this.fb.group({
      comment: ['', Validators.required]
    });
}
  ngOnInit() {
  	 this.firestore.collection('turnos').snapshotChanges().subscribe(res=>{
  	 	res.forEach(r =>{
  	 		console.log(r.payload.doc.data());
  	 		if(r.payload.doc.data()["estado"] == 'R'){
  	 			this.turnos.push({
  	 				id: r.payload.doc.id,
  	 				data:r.payload.doc.data()
  	 			});

  	 		}
  	 	})
  	 });
  }


  reseniar(id:string,dni:string,fecha:string,hora:string){
  	this.tabla = false;
  	this.dniR = dni;
  	this.fechaR = fecha;
  	this.idR = id;
  	this.horaR = hora;
  	console.log(dni);
  }

  Submit(){
  	if(this.form.valid){
  	const data: Object = {
  		dni:this.dniR,
  		fecha:this.fechaR,
  		hora:this.horaR,
  		comment: this.form.get('comment').value,
  		estado: 'T'
  	};
  	this.firestore.collection('turnos').doc(this.idR).set(data);
  	this.tabla = true;
  	location.reload();
  	

  	}else{

      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
  	}
  }

}
