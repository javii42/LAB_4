import { Component, OnInit } from '@angular/core';
import{Actor} from '../../Entities/actor';
import{ActorService} from '../../Services/actor.service';

@Component({
  selector: 'app-lista-actor',
  templateUrl: './lista-actor.component.html',
  styleUrls: ['./lista-actor.component.css']
})
export class ListaActorComponent implements OnInit {
  private actores:Array<Actor>;
  public color:string;
  constructor(private ActorService:ActorService) {
    this.color="red";
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
