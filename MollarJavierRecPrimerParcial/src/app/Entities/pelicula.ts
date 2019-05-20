export class Pelicula {
    public id : number;
    public nombre : string;
    public tipo : string;
    public fecha_estreno : string;
    public cant_publico : number;
    public ruta_foto : string;

    constructor(data : Partial<Pelicula>){
        Object.assign(this, data);
    }
}
