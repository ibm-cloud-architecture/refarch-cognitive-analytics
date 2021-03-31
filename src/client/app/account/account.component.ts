import { Component, OnInit } from '@angular/core';
import { CustomersService }  from '../customer/customers.service';
import { Customer } from "../customer/Customer";
import { User } from "../login/User";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  customer: Customer;
  error: String;

  constructor(customerService : CustomersService) {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.user && 'email' in this.user) {
      customerService.getCustomerByEmail(this.user.email).subscribe(
          data => {
            this.customer=data;
          },
          error => {
            console.log(error);
            this.error="An error occurs on backend, try again later.";
          });
    }

  }

  ngOnInit() {
  }

}
