import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  numeroIngresado:number;
  jugador;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.jugador = JSON.parse(localStorage.getItem('UsuarioLogueado'));
      
      if(this.jugador){      
        
        this.ocultarVerificar=true;
        this.Tiempo=10; 
        this.nuevoJuego = new JuegoAgilidad("Agilidad Aritmetica",false,this.jugador.correo);
        console.info("Inicio agilidad"); 
      }else{
        console.log("Ruteando...");
        this.router.navigate(['/Login']);
  
      } 
  }
  NuevoJuego() {
    this.nuevoJuego.nuevoJuego();
    this.ocultarVerificar=false;
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=10;
      }
      }, 900);

  }
  verificar()
  {
    this.ocultarVerificar=true;
    clearInterval(this.repetidor);
    if(this.nuevoJuego.validarResultado(this.numeroIngresado)){
      this.nuevoJuego.gano =true;
      this.nuevoJuego.guardarDatos();
    //  alert("Gano!");
    }else{
      this.nuevoJuego.guardarDatos();
   //   alert("Fallo");
    }
    this.numeroIngresado = null;
   

   
  }  

}
