import { Juego } from './juego';

export class JuegoAnagrama extends Juego {
    public palabras;
    public palabra;
    public anagrama;

    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(nombre,gano,jugador);
        this.gano = false;
        this.palabras = [
            "soberbia",
            "piramidal",
            "pelicano",
            "encargado",
            "electrico",
            "mariachi",
            "termófila",
            "viajero",
            "ramificado",
            "concierto"
        ];
        this.palabra = [];
    }

    public jugar(){
        this.palabra = this.palabras[Math.floor(Math.random()*this.palabras.length)].split("");
        this.anagrama = [];
        for(var i = 0; i<this.palabra.length; i++){
            this.anagrama.push(this.palabra[i]);
        }
        this.shuffle(this.anagrama);
    }

    public shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }
}
