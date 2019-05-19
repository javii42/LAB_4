import { Juego } from './juego';

export class JuegoAgilidad extends Juego{
    public firstNumber:number;
    public secondNumber:number;
    public selectedOperator:number;
    public operator:string;
    public operators;
    public resultado:number;
    
    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(nombre,gano,jugador);
        this.gano = false;
    }

    public nuevoJuego(){
        this.firstNumber = Math.floor((Math.random() * 100));
        this.secondNumber = Math.floor((Math.random() * 10));
        this.operators = ["+","-","*"];
        this.selectedOperator =  Math.floor(Math.random()*this.operators.length);
        this.operator = this.operators[this.selectedOperator];
        switch(this.operator){
            case '+':
                this.resultado = this.firstNumber + this.secondNumber;
                break;
            case '-':
                this.resultado = this.firstNumber - this.secondNumber;
                break;
            case '*':
                this.resultado = this.firstNumber * this.secondNumber;
                break;
            default:
                this.resultado = 0;
                break;
        }
    }

    public validarResultado(res):boolean{
        var retorno:boolean = false;
        if(this.resultado == res){
            retorno = true;
            this.gano = true;
        }else{
            this.gano = false;
        }
        return retorno;
    }

    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }


}
