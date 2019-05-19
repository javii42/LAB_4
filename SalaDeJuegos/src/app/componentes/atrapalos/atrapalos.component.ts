import { 
  Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
  import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { Atrapado } from '../../clases/atrapado';
import { Atrapalos } from '../../clases/atrapalos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atrapalos',
  templateUrl: './atrapalos.component.html',
  styleUrls: ['./atrapalos.component.css']
})
export class AtrapalosComponent implements AfterViewInit {

  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;  

  
  private pokemon: number;
  private pokemonAnt: number;
  private posX: number;
  private posY: number;
  private timer: number;
  private atrapados: Atrapado[];
  private cantAtrapados:number;
  public jugando:boolean;
  public finalizado:boolean;
  private promTiempo:number;
  public atrapalos:Atrapalos;
  public jugador;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.jugador = JSON.parse(localStorage.getItem('UsuarioLogueado'));
    
    if(this.jugador){  
        
      this.pokemon = Math.floor((Math.random() *640) + 1);
      this.posX = Math.floor((Math.random() *325));
      this.posY = Math.floor((Math.random() *325));
      this.jugando = false;
      this.finalizado = false;
      this.atrapados = [];
      this.pokemonAnt = 0;
      this.promTiempo = 0;
      this.atrapalos = new Atrapalos("Atrapalos",false,this.jugador.correo);
    }else{
      console.log("Ruteando...");
      this.router.navigate(['/Login']);

    }       
  }

  
  public ngAfterViewInit(): void {
     // get the context
     const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
     this.cx = canvasEl.getContext('2d');
 
     // set the width and height
     canvasEl.width = this.width;
     canvasEl.height = this.height;
 
     // set some default properties about the line
     this.cx.lineWidth = 3;
     this.cx.lineCap = 'round';
     this.cx.strokeStyle = '#000';
     
     // we'll implement this method to start capturing mouse events
     this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {

    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
  
        // previous and current position with the offset
        const element = res[0].toElement;
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
  
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
  
        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(element,prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    element,
    prevPos: { x: number, y: number }, 
    currentPos: { x: number, y: number }
  ) {
   // console.log(element);
    //console.log("(" +prevPos.x + ";" + prevPos.y + ")");
   // console.log("(" +currentPos.x + ";" + currentPos.y + ")");
    this.tomarDatos(currentPos);
    this.pokemonAnt = this.pokemon;
  }

  comenzar(){ 
    var countPkm = 0;
    var interval;
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    var cx = canvasEl.getContext('2d');
    cx.imageSmoothingEnabled = false;
    var posX = this.posX;
    var posY = this.posY;
    var img = new Image();
    this.finalizado=false;
    img.onload = function(){
        cx.drawImage(img,posX,posY);
        
    }; 
    img.src = "./assets/imagenes/pokemon/"+this.pokemon+".png";
    this.jugando = true;
    interval = setInterval(()=>{
      if(this.timer < 10){
        this.timer++;
       // console.log(timeLeft);
      }
      else if(countPkm >= 10){
        cx.clearRect(this.posX,this.posY,img.width,img.height);
        clearInterval(interval); 
        this.timer =0;
        img = new Image();
        img.onload = function(){
          cx.drawImage(img,100,90);
        }; 
        img.src = "./assets/imagenes/pokemon/pokeball.png";
        interval=setInterval(()=>{
            if(this.timer < 30){
              this.timer++;
            }else{
              cx.clearRect(100,90,img.width,img.height);
              clearInterval(interval); 
              this.timer=0;
              this.jugando = false;
              this.atrapados.forEach(element => {
                console.log(element.pokemon + "-" + element.tiempo + "ms");
                this.finalizado = true;
                this.promTiempo = this.promedioTiempo();
                if(this.promTiempo > 5.0){
                  this.atrapalos.gano = false;
                  this.atrapalos.guardarDatos();
                }else{
                  this.atrapalos.gano = true;
                  this.atrapalos.guardarDatos();
        
                }
              });
            }
        },100)
      }
      else{
        countPkm++;
        this.pokemon = Math.floor((Math.random() *640) + 1);
        cx.clearRect(this.posX,this.posY,img.width,img.height);
        posX = Math.floor((Math.random() *325));
        posY = Math.floor((Math.random() *325));
        this.posX = posX;
        this.posY = posY;
        this.timer =0;
        img = new Image();
        img.onload = function(){
          cx.drawImage(img,posX,posY);
        }; 
        img.src = "./assets/imagenes/pokemon/"+this.pokemon+".png";

       // clearInterval(interval);
      }
    },100)
  }

  
  tomarDatos(currentPos: { x: number, y: number }){
      if(
        (currentPos.x > (this.posX-75) && currentPos.x < (this.posX + 75))
        && (currentPos.y > (this.posY-75) && currentPos.y <(this.posY + 75))
        && this.pokemon !== this.pokemonAnt
      ){
       console.log("Atrapaste al pokemon: " + this.pokemon + "!!" + this.pokemonAnt);
        this.atrapados.push(new Atrapado(this.pokemon,this.timer));
        this.cantAtrapados = this.atrapados.length;
      }else{
        console.log("No atrapado! :(, pos: ("+ currentPos.x + "," + currentPos.y + ")");
        console.log("Pos Pok: ("+ this.posX + "," + this.posY + ")");
        console.log(this.pokemon + "!!" + this.pokemonAnt);
      }
  }

  promedioTiempo():number{
    var promedio:number = 0;
    var sumaTiempo:number = 0;
    if(this.atrapados.length > 0){
      this.atrapados.forEach(atrapado => {
        sumaTiempo+=atrapado.tiempo;
      });
        promedio = sumaTiempo / this.atrapados.length;

    }
    return promedio;
  }

  ngOnInit() {
  }

}
