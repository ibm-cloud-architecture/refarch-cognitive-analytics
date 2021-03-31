import ***REMOVED*** Component, Input, Output, EventEmitter ***REMOVED*** from '@angular/core';
import ***REMOVED*** CustomersService ***REMOVED***  from './customers.service';
import ***REMOVED*** Customer ***REMOVED*** from './Customer';

@Component(***REMOVED***
  selector: 'customer-detail',
  templateUrl:'customer.component.html'
***REMOVED***)
export class CustomerDetailComponent ***REMOVED***
  // Item is injected by the parent inventory component. As new item or from an existing one
  @Input() customer: Customer;
  @Input() newCustomer : boolean;
  // specify to the parent we are done with editing -> saving
  @Output() onComplete = new EventEmitter<any>();
  message : string ="";
  account : boolean= false;

  // delegate the call to BFF via local service
  constructor(private customerService : CustomersService)***REMOVED***
  ***REMOVED***

  save(): void  ***REMOVED***
    if (this.newCustomer) ***REMOVED***
      this.customerService.saveCustomer(this.customer).subscribe(
          data => ***REMOVED***
            console.log('data from saveCustomer',data)
            this.customer=data;
            this.customer.id = data[0].id;
            this.message="Success";
            this.onComplete.emit(***REMOVED***success: true, customer: this.customer***REMOVED***);
        ***REMOVED***
          error => ***REMOVED***
            console.error("Error on save operation:"+error);
            this.message="Error on save";
            this.onComplete.emit(***REMOVED***success: false, customer: this.customer, error: error***REMOVED***);
          ***REMOVED***
        );
    ***REMOVED*** else ***REMOVED***
      this.customerService.updateCustomer(this.customer).subscribe(
          data => ***REMOVED***
            // this.item=data;
            this.message="Success";
            this.onComplete.emit(***REMOVED***success: true, customer: this.customer***REMOVED***);
        ***REMOVED***
          error => ***REMOVED***
            console.error("Error on update operation:"+error);
            this.message="Error on update";
            this.onComplete.emit(***REMOVED***success: false, customer: this.customer, error: error***REMOVED***);
          ***REMOVED***
        );
    ***REMOVED***
  ***REMOVED***

  viewAccount(): void ***REMOVED***
    this.account=!this.account;
  ***REMOVED***
***REMOVED***
