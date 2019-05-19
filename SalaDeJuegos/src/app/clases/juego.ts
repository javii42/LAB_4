export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;

  constructor(nombre?: string, gano?: boolean,jugador?:string) {
    if (nombre)
      this.nombre = nombre;

    if (gano)
      this.gano = gano;
    if(jugador)
      this.jugador=jugador;
    else
      this.jugador= "natalia natalia";
  }


  

  public abstract verificar():boolean; 

  public guardarDatos(){
    var partidas = JSON.parse(localStorage.getItem('partidas'));
    if(partidas == null){
      var partidasAux = [{
          "jugador": "javier@gmail.com",
          "juego": "Adivina el número",
          "resultado":false
      },
      {         
        "jugador": "pepe@gmail.com",
        "juego": "Anagrama",
        "resultado":false
      },
      {
        "jugador": "roberto@gmail.com",
        "juego": "Atrapalos",
        "resultado":true
      },
      {
        "jugador": "javier@gmail.com",
        "juego": "Piedra Papel Tijera",
        "resultado":true
      },
      {
        "jugador": "javier@gmail.com",
        "juego": "Piedra Papel Tijera",
        "resultado":false
      },];
      
      localStorage.setItem('partidas', JSON.stringify(partidasAux));
      partidas = partidasAux;
    }
    partidas.push({"jugador":this.jugador,"juego":this.nombre,"resultado":this.gano});
    localStorage.setItem('partidas',JSON.stringify(partidas));
    console.log(partidas);
  }
  
  public retornarAyuda() {
    
    return "NO hay Ayuda definida";
  }
}
