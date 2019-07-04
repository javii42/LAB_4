import { log } from 'util';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError, delay } from 'rxjs/operators';

@Injectable()
export class HttpBase {
  urlBase: String = 'http://localhost/BuenaSonrisaAPI';
 // urlBase: String = 'https://mollar.000webhostapp.com';

  constructor( public http: HttpClient ) {
   }

  public httpGetP ( url: string) {
    return this.http
    .get( this.urlBase + url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpDeleteP ( url: string) {
    return this.http
    .delete( this.urlBase + url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpPutP ( url: string, request: Object) {
    return this.http.put(this.urlBase + url, request).toPromise();
  }

  public httpPostP( url: string, request: Object) {
    console.log(this.urlBase + url);
    console.log(request);

   // const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post( this.urlBase + url, request).toPromise();
  }

  // tslint:disable-next-line:no-shadowed-variable
  public httpGetO<T>( url: string) {
    return this.http.get<T>( this.urlBase + url );
  }


  private extractData ( res: Response ) {
    return res.json() || {};
  }

  private handleError ( error: Response | any ) {
    return error;
  }
}
