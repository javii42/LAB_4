export class RelacionClaves {
	public id_pelicula;
	public id_actor;

	constructor(id_pelicula, id_actor,data : Partial<RelacionClaves>){
		this.id_actor = id_actor;
		this.id_pelicula = id_pelicula;
        Object.assign(this, data);
	}
}
