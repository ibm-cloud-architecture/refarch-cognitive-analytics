import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomersService }  from './customers.service';
import { Customer } from './Customer';

@Component({
  selector: 'customer-detail',
  templateUrl:'customer.component.html'
})
export class CustomerDetailComponent {
  // Item is injected by the parent inventory component. As new item or from an existing one
  @Input() customer: Customer;
  @Input() newCustomer : boolean;
  // specify to the parent we are done with editing -> saving
  @Output() onComplete = new EventEmitter<any>();
  message : string ="";
  account : boolean= false;

  // delegate the call to BFF via local service
  constructor(private customerService : CustomersService){
  }

  save(): void  {
    if (this.newCustomer) {
      this.customerService.saveCustomer(this.customer).subscribe(
          data => {
            console.log('data from saveCustomer',data)
            this.customer=data;
            this.customer.id = data[0].id;
            this.message="Success";
            this.onComplete.emit({success: true, customer: this.customer});
          },
          error => {
            console.error("Error on save operation:"+error);
            this.message="Error on save";
            this.onComplete.emit({success: false, customer: this.customer, error: error});
          }
        );
    } else {
      this.customerService.updateCustomer(this.customer).subscribe(
          data => {
            // this.item=data;
            this.message="Success";
            this.onComplete.emit({success: true, customer: this.customer});
          },
          error => {
            console.error("Error on update operation:"+error);
            this.message="Error on update";
            this.onComplete.emit({success: false, customer: this.customer, error: error});
          }
        );
    }
  }

  viewAccount(): void {
    this.account=!this.account;
  }
}
