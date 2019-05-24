import { Component, OnInit } from '@angular/core';
import{Pelicula} from '../../Entities/pelicula';
import{PeliculaService} from '../../Services/pelicula.service';
import{LoginService} from '../../Services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  private peliculas:Array<Pelicula>;
  public color:string;
  private token;
  private user;
  constructor(private PeliculaService:PeliculaService,
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
    this.PeliculaService.Listar().subscribe(lista => {
      this.peliculas = lista;
    })
    console.log(this.peliculas);
  }

}
