import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  @Output() email = new EventEmitter<String>();
  public mail;
  public perfil;
  constructor(private authService: AuthService, private router: Router, private jwt: JwtHelperService) {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    this.mail = tokenInfo['mail'];
    this.perfil = tokenInfo['perfil'];

    this.email.emit(this.mail);
  }
  ngOnInit() {
  }

  public onEmail(email:String){

  	console.log(email);
  }

}
