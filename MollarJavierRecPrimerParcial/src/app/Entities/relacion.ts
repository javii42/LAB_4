export class Relacion {
	public id_pelicula;
	public id_actor;
    public nombre : string;
    public apellido : string;
    public pelicula : number;
    public ruta_foto : string;

    constructor(data : Partial<Relacion>){
        Object.assign(this, data);
    }
}
