import { Registro } from 'src/app/Common/Registro';
import { FormBuilder, Validators } from '@angular/forms';
import { ZapatoService } from './../../../../Services/zapato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class Registro2Component extends Registro implements OnInit {
  private file: string;
  constructor(private fb: FormBuilder, private zapatoService: ZapatoService) {
    super();
    this.file = '';
    this.resetForm();
  }

  resetForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cuatrimestre: ['', Validators.required],
      cupos: ['', Validators.required],
      profesor: ['1']
    });


  }

  ngOnInit() {
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = reader.result.toString();
      };
    }
  }

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const nombre = this.form.get('nombre').value;
      const cuatrimestre = this.form.get('cuatrimestre').value;
      const cupos = this.form.get('cupos').value;
      const profesor = this.form.get('profesor').value;

      console.log(this.file);
      this.zapatoService.Registrar(nombre, cuatrimestre, cupos, profesor)
        .then(
          response => {
            if (response['Estado'] === 'OK') {
              this.success = true;
              this.resetForm();
              this.registradoCorrectamente.emit();
            } else {
              this.error = true;
              this.errorMessage = response['Mensaje'];
            }
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = error['Mensaje'];
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
   }
  }

}
