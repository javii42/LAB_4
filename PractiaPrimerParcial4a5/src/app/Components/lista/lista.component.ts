import { Component, OnInit } from '@angular/core';
import{Vehiculo} from '../../Entities/vehiculo';
import{VehiculoService} from '../../Services/vehiculo.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  private vehiculos:Array<Vehiculo>;
  public color:string;
  constructor(private VehiculosService:VehiculoService) {
    this.color="red";
   }

  ngOnInit() {
    this.RefreshData();
  }

  public RefreshData(): void {
    this.VehiculosService.Listar().subscribe(lista => {
      this.vehiculos = lista;
    })
  }

}
