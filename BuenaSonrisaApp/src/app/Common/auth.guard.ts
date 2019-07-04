import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    const roles = next.data['roles'] as Array<string>;
    return this.checkLogin(url, roles);
  }

  checkLogin(url: string, roles: Array<string>): boolean {
    const token = localStorage.getItem('token');
    const tokenInfo = JSON.parse(token); //this.jwt.decodeToken(token);
    // tslint:disable-next-line:no-inferrable-types
    let check: boolean = false;
    if (tokenInfo) {
      const tipoUsuario = tokenInfo['tipo'];
      console.log("tokenInfo: ", tokenInfo);
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = '/';
      roles.forEach(element => {
        if (tipoUsuario === element) {
          check = true;
        }
      });
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
    }

    if (!check) {
      this.authService.logout();
      // Navigate to the login page with extras
      this.router.navigate(['/Login']);
    }

    return check;
  }
}
