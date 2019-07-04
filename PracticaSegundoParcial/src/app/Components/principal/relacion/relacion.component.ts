
import { Registro } from 'src/app/Common/Registro';
import { FormBuilder, Validators } from '@angular/forms';
import { RelacionService } from './../../../Services/relacion.service';
import { Component, OnInit } from '@angular/core';
import { Relacion } from './../../../Model/Relacion';

@Component({
  selector: 'app-relacion',
  templateUrl: './relacion.component.html',
  styleUrls: ['./relacion.component.scss']
})
export class RelacionComponent extends Registro implements OnInit {
  private file: string;
  listaMateria: Relacion[];
  constructor(private fb: FormBuilder, private RelacionService: RelacionService) {
    super();
    this.file = '';
    this.resetForm();
    this.cargarLista();
  }

  resetForm() {
    this.form = this.fb.group({
      alumno: ['', Validators.required],
      materia: ['', Validators.required]
    });


  }

  ngOnInit() {
  }
  cargarLista() {
    this.RelacionService.Listar().subscribe( response => {
      this.listaMateria = response;
    });
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
      const alumno = this.form.get('alumno').value;
      const materia = this.form.get('materia').value;

      console.log(this.file);
      this.RelacionService.Registrar(alumno,materia)
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
