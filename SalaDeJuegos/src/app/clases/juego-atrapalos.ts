import { Juego } from '../clases/juego'

export class JuegoAtrapalos extends Juego{

    
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Atrapalos a todos",gano,jugador);   
      }

    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }

}
