import { Component, OnInit } from '@angular/core';
import{TurnoService} from './../../Services/turno.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {

 constructor(private fb: FormBuilder, private TurnoService: TurnoService,
 	private firestore:AngularFirestore) {
    this.resetForm();
  } 

  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;

  resetForm() {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      dni: [33222244, Validators.required]
    });


  }

  ngOnInit() {
  }



  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    let usuario;
    if (this.form.valid) {
      const dni = this.form.get('dni').value;
      const fecha = this.form.get('fecha').value;
      const hora = this.form.get('hora').value;
      const request: Object = {
      dni: dni,
      fecha: fecha,
      hora: hora,
      estado: 'P'
    };
    var validHour = /^([0][8-9]|[1][0-9]):([0-5][0-9])$/.test(hora);
    console.log(validHour);
    if(validHour){
	    this.firestore.collection('usuarios').snapshotChanges().subscribe((res)=>{
	    	this.errorMessage = "El DNI no pertenece a un cliente";
	    	this.error = true;
	    	res.forEach(r =>{
	    		usuario = r.payload.doc.data();
	    		console.log(usuario);
	    		if(usuario["tipo"] == "Cliente" && usuario["dni"] == dni){
	    			console.log("ok");
	    			this.error = false;
					this.firestore.collection('turnos').add(request);				
	    			this.success = true;
	    			this.resetForm();
	    		}
	    	})
	    },(err)=> console.log(err),
	    ()=> console.log("finish")
	    );

    }else{
    	this.errorMessage = "Horario invalido";
      	this.error = true;
    }

      }
    else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
   }
  }

}
