import { Injectable,EventEmitter, Input, Output } from '@angular/core';
import { HttpBase } from './http-base.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';


import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() email = new EventEmitter<String>();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  user: Observable<firebase.User>;


  constructor(public miHttp: HttpBase, public router: Router,
    private firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = firebaseAuth.authState;
 }


  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  loginFb(email: string, password: string) {
    let usuario;
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.afs.collection('usuarios').snapshotChanges().subscribe((res) =>{
            res.forEach(r =>{
              usuario = r.payload.doc.data();
              if(usuario["mail"] == email){
                localStorage.setItem("token", JSON.stringify(usuario));
              this.router.navigate(['/']);
              }
            })
        });

      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });

  }

  logoutFb() {
    localStorage.removeItem('token');
    this.firebaseAuth
      .auth
      .signOut();
  }

  loguear(mail: string, nombre: string, pass: string, tipo: string) {

    const request: Object = {
      mail: mail,
      nombre: nombre,
      pass: pass,
      tipo: tipo
    };
    console.log("todavía no entro");
    return this.miHttp.httpPostP('/login', request).then( response => {
      if (response['Estado'] === 'OK') {
        localStorage.setItem('token', response['Token']);
        if (!this.redirectUrl) {
          this.redirectUrl = '/';
          console.log("OK");
          this.email.emit(mail);
        }
        this.router.navigate([this.redirectUrl]);
      }

      return response;
    }).catch(error =>{
      console.log("catch", error);
    });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
