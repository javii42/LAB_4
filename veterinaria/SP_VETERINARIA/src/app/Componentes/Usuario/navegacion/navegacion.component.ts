import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {

  public mail: string;
  public tipo: string;

  constructor(private authService: AuthService, private router: Router, private jwt: JwtHelperService) {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    this.mail = tokenInfo['mail'];
    this.tipo = tokenInfo['tipo'];
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
  }

}
