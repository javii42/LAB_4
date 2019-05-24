import { Component,Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {PeliculaService} from '../../Services/pelicula.service';
import{Pelicula} from '../../Entities/pelicula';
import {ActorService} from '../../Services/actor.service';
import {RelacionService} from '../../Services/relacion.service';
import{Actor} from '../../Entities/actor';
import{RelacionClaves} from '../../Entities/relacion-claves';
import{LoginService} from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  @Output() agregadoNuevo : EventEmitter<{}>
  @Output() resultadoBuscar : EventEmitter<Pelicula[]>
  public error : boolean;
  public errorMessage : string;
  private actores:Array<Actor>;
  private token;
  private user;
  public profileForm= new FormGroup({
    nombre : new FormControl(''),
    tipo : new FormControl(''),
    actor : new FormControl(''),
    cant_publico: new FormControl(''),
    fecha_estreno: new FormControl('')
  });;

  constructor(private PeliculaService : PeliculaService,
    private RelacionService: RelacionService,
    private formBuilder : FormBuilder,
    private ActorService:ActorService,
    private LoginService:LoginService,
    private router: Router) {
    this.ActorService.Listar().subscribe(lista => {
      this.actores = lista;
    }) 
    this.error = false;

    this.agregadoNuevo = new EventEmitter<{}>();
    this.resultadoBuscar = new EventEmitter<Pelicula[]>();
    this.token = '[{"token": "'+console.log(localStorage.getItem("token"))+'"}]';
    console.log(JSON.parse(this.token));
    this.LoginService.Verificar(JSON.parse(this.token)).then(data =>{
      this.user = data;
    },err =>{
      console.log("e");
    });
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    console.log(this.user[0].perfil);
    if(this.user[0].perfil != "admin"){
      router.navigate(["/"]);
    }


  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      nombre:[
        '',
        Validators.required
      ],
      tipo: [
        "Otros"
      ],
      cant_publico: [
        '',
        Validators.required
      ],
      fecha_estreno: [
        '',
        Validators.required
      ],
      actor: [
        '']
    });
    
    this.profileForm.controls["cant_publico"].setValue("otros");
  }

  public AgregarClicked(content):void{
  }

  public onSubmit():void{    
    this.error = false;
    var id_actor = this.profileForm.controls["actor"].value;
    var nombre_pelicula = this.profileForm.controls["nombre"].value;
    this.PeliculaService.Agregar(this.profileForm.value)
    .then( () =>{
      this.agregadoNuevo.emit();    
      this.profileForm.reset();   
      this.profileForm.controls["cant_publico"].setValue("otros");
      alert("Pelicula cargada");
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.message;
    });

      var id_pelicula;
    this.PeliculaService.ListarID().subscribe(data =>{
      id_pelicula = data[0].id + 1;
      var array:JSON =JSON.parse('{"id_pelicula":"' + id_pelicula +'","id_actor" :"' + id_actor + '"}');
      console.log(array);
      this.RelacionService.Agregar(array).then(data =>{
        console.log(data);
      }, err => {
        console.log(err);
      });
      alert("Relacion generada");
    });
  } 
}
