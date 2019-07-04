import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  @Output() email = new EventEmitter<String>();
  public mail;
  public perfil;
  constructor(private authService: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    const tokenInfo = JSON.parse(token);
    this.mail = tokenInfo['mail'];
    this.perfil = tokenInfo['tipo'];

    this.email.emit(this.mail);
  }
  ngOnInit() {
  }

  public onEmail(email:String){

  	console.log(email);
  }

}