export class Usuario {
	public nombre:string;
	public mail:string;
	public clave:string;
	public perfil:string;

    constructor(data : Partial<Usuario>){
        Object.assign(this, data);
    }
}
