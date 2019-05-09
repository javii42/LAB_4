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
  constructor(private VehiculosService:VehiculoService) { }

  ngOnInit() {
    this.RefreshData();
  }

  public RefreshData(): void {
    this.VehiculosService.Listar().subscribe(lista => {
      this.vehiculos = lista;
    })
  }

}
