import { Component, OnInit } from '@angular/core';
import{UsuarioService} from './../../Services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  @Output() registradoCorrectamente: EventEmitter<any>;
  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;

  constructor(private fb: FormBuilder, private UsuarioService: UsuarioService) {
    this.resetForm();
  }

  resetForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      dni: [0, Validators.required],
      tipo: ['Cliente'],
      pass: ['', Validators.required],
      imagen: ['']
    });


  }

  ngOnInit() {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imagen').setValue(file);
    }

    /*const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = reader.result.toString();
      };
    }*/
  }

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const nombre = this.form.get('nombre').value;
      const apellido = this.form.get('apellido').value;
      const mail = this.form.get('mail').value;
      const dni = this.form.get('dni').value;
      const tipo = this.form.get('tipo').value;
      const pass = this.form.get('pass').value;
      const file =  this.form.get('imagen').value;
      this.UsuarioService.Registrar(nombre, apellido, mail, dni,tipo,pass,file)
        .then(
          response => {
              this.success = true;
              this.resetForm();
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = error['Mensaje'];
            console.log(error)
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
   }
  }
 }
