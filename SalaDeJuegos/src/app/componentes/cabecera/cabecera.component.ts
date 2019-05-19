import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public usuario;
  public nombreUsuario;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.usuario = JSON.parse(localStorage.getItem('UsuarioLogueado'));
    //console.log(this.usuario);
    if(this.usuario != null) {
      this.nombreUsuario = this.usuario.correo;
    }
  }

  public cerrarSesion(){
    localStorage.setItem('UsuarioLogueado',null);
    this.router.navigate(['/Login']);

  }
  ngOnInit() {
  }

}
