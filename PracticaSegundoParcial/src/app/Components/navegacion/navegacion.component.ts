import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {

  public mail: string;
  public perfil: string;

  constructor(private authService: AuthService, private router: Router, private jwt: JwtHelperService) {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    this.mail = tokenInfo['mail'];
    this.perfil = tokenInfo['perfil'];
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
  }

}
