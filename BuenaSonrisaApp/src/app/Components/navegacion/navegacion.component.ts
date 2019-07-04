import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  public mail: string;
  public tipo: string;
  public nombre: string;

  constructor(private authService: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    const tokenInfo = JSON.parse(token);
    this.mail = tokenInfo['mail'];
    this.tipo = tokenInfo['tipo'];
    this.nombre = tokenInfo['nombre'];
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logoutFb();
    this.router.navigate(['/Login']);
  }

}
