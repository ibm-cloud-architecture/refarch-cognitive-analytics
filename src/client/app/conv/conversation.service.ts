import { Injectable }    from '@angular/core';
import { Headers, Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ConversationService {
  private convUrl ='/api/c/conversation/';

  constructor(private http: Http) {
  };

  submitMessage(msg:string,ctx:any): Observable<any>{
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    let bodyString = JSON.stringify(  { text:msg,context:ctx,user:user });

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers })
    return this.http.post(this.convUrl,bodyString,options)
         .map((res:Response) => res.json())
  }
}
