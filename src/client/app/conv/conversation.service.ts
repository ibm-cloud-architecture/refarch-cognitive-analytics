import ***REMOVED*** Injectable ***REMOVED***    from '@angular/core';
import ***REMOVED*** Headers, Http,Response,RequestOptions ***REMOVED*** from '@angular/http';
import 'rxjs/add/operator/toPromise';
import ***REMOVED***Observable***REMOVED*** from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ConversationService ***REMOVED***
  private convUrl ='/api/c/conversation/';

  constructor(private http: Http) ***REMOVED***
  ***REMOVED***;

  submitMessage(msg:string,ctx:any): Observable<any>***REMOVED***
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    let bodyString = JSON.stringify(  ***REMOVED*** text:msg,context:ctx,user:user ***REMOVED***);

    let headers = new Headers(***REMOVED*** 'Content-Type': 'application/json' ***REMOVED***);
    let options = new RequestOptions(***REMOVED*** headers: headers ***REMOVED***)
    return this.http.post(this.convUrl,bodyString,options)
         .map((res:Response) => res.json())
  ***REMOVED***
***REMOVED***
