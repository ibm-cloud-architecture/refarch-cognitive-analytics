import { Injectable }    from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/**
General control service to control the features to expose
*/
@Injectable()
export class HomeService {
  private invUrl ='/api';

  constructor(private http: Http) {
  };

  // this method is used to control the user interface features.  
  getMode(): Observable<any>{
    return this.http.get(this.invUrl+'/mode')
         .map((res:Response) => res.json())
  }
}
