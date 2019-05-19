import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  public juegoAnagrama:JuegoAnagrama;
  public respuesta;
  public jugando:boolean;
  public Tiempo: number;
  public repetidor:any;
  public primerJuego:boolean;
  public jugador;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.jugador = JSON.parse(localStorage.getItem('UsuarioLogueado'));
      
      if(this.jugador){   
        this.juegoAnagrama = new JuegoAnagrama("Anagrama",false,this.jugador.correo);
        this.respuesta = [];
        this.jugando = false;
        this.Tiempo = 60;
        this.primerJuego = false;  
      }else{
        console.log("Ruteando...");
        this.router.navigate(['/Login']);
  
      }
   }

   public jugar(){
     this.juegoAnagrama.jugar();
     this.jugando = true;
     this.repetidor = setInterval(()=>{ 
        
        this.Tiempo--;
        if(this.Tiempo==0 ) {
          this.verificar();
          this.Tiempo=60;
        }
        }, 900);
   }

   public verificar(){
      clearInterval(this.repetidor);
      this.primerJuego = true;
     var correcto:boolean = true;
     if(this.respuesta.length != this.juegoAnagrama.palabra.length){
        correcto = false;
     }else{
      for(var i = 0; i < this.respuesta.length; i++){
         if(this.respuesta[i] != this.juegoAnagrama.palabra[i]){
           correcto = false;
           break;
         }
      }
     }
     this.juegoAnagrama.gano = correcto;
     this.juegoAnagrama.guardarDatos();
     this.respuesta = [];
     this.jugando = false;
   }

  ngOnInit() {
  }
  

  public onKey(event: any) {
   //console.log(event);
    let id = event.target.id; 
    id = parseInt(id,10);
    let nextId = id + 1;
   // console.log(nextId);
    if(nextId <= this.respuesta.length){
      var element = document.getElementById(nextId);
      if(element != null && event.key != "Backspace" && event.key != "Tab" && event.key != "Shift"){
        element.focus();
      }
    }
    
  }

}
