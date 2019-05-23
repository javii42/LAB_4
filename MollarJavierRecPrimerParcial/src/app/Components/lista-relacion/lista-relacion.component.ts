import { Component, OnInit } from '@angular/core';
import{Relacion} from '../../Entities/relacion';
import{RelacionService} from '../../Services/relacion.service';

@Component({
  selector: 'app-lista-relacion',
  templateUrl: './lista-relacion.component.html',
  styleUrls: ['./lista-relacion.component.css']
})
export class ListaRelacionComponent implements OnInit {
  private relaciones:Array<Relacion>;
  public color:string;
  constructor(private RelacionService:RelacionService) {
    this.color="red";
   }

  ngOnInit() {
    this.RefreshData();
  }

  public RefreshData(): void {
    this.RelacionService.Listar().subscribe(lista => {
      this.relaciones = lista;
    })
    console.log(this.relaciones);
  }

}
