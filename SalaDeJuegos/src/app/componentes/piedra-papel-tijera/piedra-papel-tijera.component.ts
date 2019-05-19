import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  public juego:JuegoPiedraPapelTijera;
  public jugando:boolean;
  public piedraJ:boolean;
  public papelJ:boolean;
  public tijeraJ:boolean;
  public piedraM:boolean;
  public papelM:boolean;
  public tijeraM:boolean;
  public jugador;
  constructor(
    private route: ActivatedRoute,
    private router: Router) { 
      this.jugador = JSON.parse(localStorage.getItem('UsuarioLogueado'));
      
      if(this.jugador){  

        this.juego = new JuegoPiedraPapelTijera("Piedra Papel o Tijera",false,this.jugador.correo);
        this.jugando = false;
        this.piedraJ = false;
        this.piedraM = false;
        this.papelJ = false;
        this.papelM = false;
        this.tijeraJ = false;
        this.tijeraM = false;    
      }else{
        console.log("Ruteando...");
        this.router.navigate(['/Login']);
  
      }
  }

  public seleccion(select:string){
    if(!this.jugando){
      switch(select){
        case 'piedra':
          this.piedraJ = true;
          break;
        case 'papel':
          this.papelJ = true;
          break;
        case 'tijera':
          this.tijeraJ = true;
          break;
      }
      this.juego.jugar(select);
      this.jugando = true;
      switch(this.juego.eleccionMaquina){
        case 'piedra':
          this.piedraM = true;
          break;
        case 'papel':
          this.papelM= true;
          break;
        case 'tijera':
          this.tijeraM = true;
          break;

      }
    }
  }

  public jugarNuevamente(){
    this.jugando = false;
    this.jugando = false;
    this.piedraJ = false;
    this.piedraM = false;
    this.papelJ = false;
    this.papelM = false;
    this.tijeraJ = false;
    this.tijeraM = false;
  }

  ngOnInit() {
  }

}
