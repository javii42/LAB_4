import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  
  constructor(
    private route: ActivatedRoute,
    private router: Router){
   //   console.log(localStorage.getItem('UsuarioLogueado'));
    if(!JSON.parse(localStorage.getItem('UsuarioLogueado'))){
      this.router.navigate(['/Login']);
    }
  }

  ngOnInit() {
  }

 

}
