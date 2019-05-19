import { Juego } from './juego';

export class Atrapalos extends Juego{

    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(nombre,gano,jugador);
    }

    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }
    
}
