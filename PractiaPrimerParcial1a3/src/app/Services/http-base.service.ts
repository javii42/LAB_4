
import { log } from 'util';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService<T> {
  private urlBase:String;

  constructor(public http: HttpClient) {
      this.urlBase = "http://localhost/API/"; // "http://localhost:8080/API/"
   }
   

  public httpGetP ( url: string)
  {
    return this.http
    .get( this.urlBase + url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpDeleteP ( url: string)
  {
    return this.http
    .delete( this.urlBase + url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpPostP( url: string, objeto: JSON )
  {
    return this.http.post( this.urlBase + url, objeto).toPromise();
  }

  public httpGetO<T>( url: string)
  {
    return this.http.get<T>( this.urlBase +url );
  }


  private extractData ( res: Response )
  {
    return res.json() || {};
  }

  private handleError ( error: Response | any )
  {
    return error;
  }
}
