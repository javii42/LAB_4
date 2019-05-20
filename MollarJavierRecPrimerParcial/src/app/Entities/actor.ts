export class Actor {
    public id : number;
    public nombre : string;
    public apellido : string;
    public nacionalidad : number;
    public fecha_nacimiento : string;

    constructor(data : Partial<Actor>){
        Object.assign(this, data);
    }
}
