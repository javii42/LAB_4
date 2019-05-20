import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';

@Injectable()
export class DataService {

private subject = new Subject<any>();  

updateRouteData(data) {
    this.subject.next(data);
}

routeData(): Observable<any> {
    return this.subject.asObservable();
}
}
