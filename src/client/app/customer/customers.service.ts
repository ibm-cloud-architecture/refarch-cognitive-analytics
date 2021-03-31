import ***REMOVED*** Injectable ***REMOVED***    from '@angular/core';
import ***REMOVED*** Headers, Http,Response,RequestOptions ***REMOVED*** from '@angular/http';
import 'rxjs/add/operator/toPromise';
import ***REMOVED***Observable***REMOVED*** from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class CustomersService ***REMOVED***
  private custUrl ='/api/cust';

  constructor(private http: Http) ***REMOVED***

  ***REMOVED***;

  getCustomers(): Observable<any>***REMOVED***
    return this.http.get(this.custUrl+'/customers')
         .map((res:Response) =>
          res.json())
  ***REMOVED***

  getCustomerByEmail(email): Observable<any>***REMOVED***
    return this.http.get(this.custUrl+'/customers/email/'+email)
         .map((res:Response) =>
          res.json())
  ***REMOVED***

  saveCustomer(c) : Observable<any> ***REMOVED***
    return this.http.post(this.custUrl+'/customers',***REMOVED***customer:c***REMOVED***).map((res:Response) => res.json());
  ***REMOVED***

  updateCustomer(c): Observable<any> ***REMOVED***
      return this.http.put(this.custUrl+'/customers',***REMOVED***customer:c***REMOVED***).map((res:Response) => res.json());
  ***REMOVED***

  deleteCustomer(idx) : Observable<any> ***REMOVED***
    return this.http.delete(this.custUrl+'/customers/'+idx)
    .map((res:Response) =>
       res.json());
  ***REMOVED***

***REMOVED***
