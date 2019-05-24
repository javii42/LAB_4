import { Component, OnInit } from '@angular/core';
import{Actor} from '../../Entities/actor';
import{ActorService} from '../../Services/actor.service';
import{LoginService} from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-actor',
  templateUrl: './lista-actor.component.html',
  styleUrls: ['./lista-actor.component.css']
})
export class ListaActorComponent implements OnInit {
  private actores:Array<Actor>;
  public color:string;
  private token;
  private user;
  constructor(private ActorService:ActorService,
    private LoginService:LoginService,
    private router: Router) {
    this.color="red";
    this.token = '[{"token": "'+console.log(localStorage.getItem("token"))+'"}]';
    console.log(JSON.parse(this.token));
    this.LoginService.Verificar(JSON.parse(this.token)).then(data =>{
      this.user = data;
    },err =>{
      console.log("e");
    });
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    console.log(this.user[0].perfil);
    if(this.user[0].perfil != "admin" && this.user[0].perfil != "visita"){
      router.navigate(["/"]);
    }
   }

  ngOnInit() {
    this.RefreshData();
  }

  public RefreshData(): void {
    this.ActorService.Listar().subscribe(lista => {
      this.actores = lista;
    })
    console.log(this.actores);
  }

}
