import ***REMOVED*** Component, OnInit ***REMOVED*** from '@angular/core';
import ***REMOVED*** CustomersService ***REMOVED***  from '../customer/customers.service';
import ***REMOVED*** Customer ***REMOVED*** from "../customer/Customer";
import ***REMOVED*** User ***REMOVED*** from "../login/User";

@Component(***REMOVED***
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
***REMOVED***)
export class AccountComponent implements OnInit ***REMOVED***

  user: User;
  customer: Customer;
  error: String;

  constructor(customerService : CustomersService) ***REMOVED***
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.user && 'email' in this.user) ***REMOVED***
      customerService.getCustomerByEmail(this.user.email).subscribe(
          data => ***REMOVED***
            this.customer=data;
        ***REMOVED***
          error => ***REMOVED***
            console.log(error);
            this.error="An error occurs on backend, try again later.";
          ***REMOVED***);
    ***REMOVED***

  ***REMOVED***

  ngOnInit() ***REMOVED***
  ***REMOVED***

***REMOVED***
