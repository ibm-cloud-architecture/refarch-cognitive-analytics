import { Injectable }    from '@angular/core';
import { Headers, Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class CustomersService {
  private custUrl ='/api/cust';

  constructor(private http: Http) {

  };

  getCustomers(): Observable<any>{
    return this.http.get(this.custUrl+'/customers')
         .map((res:Response) =>
          res.json())
  }

  getCustomerByEmail(email): Observable<any>{
    return this.http.get(this.custUrl+'/customers/email/'+email)
         .map((res:Response) =>
          res.json())
  }

  saveCustomer(c) : Observable<any> {
    return this.http.post(this.custUrl+'/customers',{customer:c}).map((res:Response) => res.json());
  }

  updateCustomer(c): Observable<any> {
      return this.http.put(this.custUrl+'/customers',{customer:c}).map((res:Response) => res.json());
  }

  deleteCustomer(idx) : Observable<any> {
    return this.http.delete(this.custUrl+'/customers/'+idx)
    .map((res:Response) =>
       res.json());
  }

}
