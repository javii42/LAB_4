
import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego{
    public piedraPapelTijera = ["piedra","papel","tijera"];
    public eleccionMaquina;
    public empato:boolean;
    constructor(nombre?: string, gano?: boolean,jugador?:string){        
        super(nombre,gano,jugador);
        this.gano = false;
        this.empato = false;
    }

    public jugar(eleccionJugador){
        this.eleccionMaquina = this.piedraPapelTijera[Math.floor(Math.random()*this.piedraPapelTijera.length)];
        switch(this.eleccionMaquina){
            case "piedra":
                if(eleccionJugador == this.eleccionMaquina){
                    this.empato = true;
                }else if(eleccionJugador == "papel"){
                    this.empato = false;
                    this.gano = true;
                }else{
                    this.empato = false;
                    this.gano = false;
                }
                break;            
            case "papel":
                if(eleccionJugador == this.eleccionMaquina){
                    this.empato = true;
                }else if(eleccionJugador == "tijera"){
                    this.empato = false;
                    this.gano = true;
                }else{
                    this.empato = false;
                    this.gano = false;
                }
                break;            
            case "tijera":
                    if(eleccionJugador == this.eleccionMaquina){
                        this.empato = true;
                        this.gano = false;
                    }else if(eleccionJugador == "piedra"){
                        this.empato = false;
                        this.gano = true;
                    }else{
                        this.empato = false;
                        this.gano = false;
                    }
                    break;
        }
        this.guardarDatos();
    }
    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }

}
