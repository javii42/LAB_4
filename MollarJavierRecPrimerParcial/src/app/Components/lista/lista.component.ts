import { Component, OnInit } from '@angular/core';
import{Pelicula} from '../../Entities/pelicula';
import{PeliculaService} from '../../Services/pelicula.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  private peliculas:Array<Pelicula>;
  public color:string;
  constructor(private PeliculaService:PeliculaService) {
    this.color="red";
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
