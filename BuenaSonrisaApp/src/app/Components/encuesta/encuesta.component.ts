import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;

  constructor(private fb: FormBuilder,private firestore:AngularFirestore) {
    this.resetForm();
  }

  resetForm() {
    this.form = this.fb.group({
      recepcion: [10, Validators.required],
      especialista: [10, Validators.required],
      instalaciones: [10, Validators.required],
      comment: ['', Validators.required]
    });


  }
  ngOnInit() {
  }



  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const recepcion = this.form.get('recepcion').value;
      const especialista = this.form.get('especialista').value;
      const instalaciones = this.form.get('instalaciones').value;
      const comment = this.form.get('comment').value;
      var token = localStorage.getItem("token");
      var tokenInfo = JSON.parse(token);
      const request: Object = {
      	dni : tokenInfo["dni"],
      	recepcion : recepcion,
      	especialista : especialista,
      	instalaciones : instalaciones,
      	comment : comment
      };

		this.firestore.collection('encuestas').add(request).then()
        .then(
          response => {
              this.success = true;
              this.resetForm();
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = "Error al cargar la encuesta";
            console.log(error)
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
   }
  }

}
