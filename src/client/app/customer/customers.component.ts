import {Component, OnInit} from '@angular/core';
import { CustomersService }  from './customers.service';
import { Customer } from "./Customer";
import { Router } from '@angular/router';

@Component({
    selector: 'customers',
    styleUrls:['customer.css'],
    templateUrl:'customers.component.html'
  })

export class CustomersComponent implements OnInit {
  customers : Customer[]=[];
  message: string = "May take some time to load....";
  loading: boolean= true;
  selectedCustomer: Customer;
  index: number = -1;
  submitError: string;
  newCustomer : boolean = false;

  constructor(private router: Router, private custService : CustomersService){
  }

  // Uses in init to load data and not the constructor.
  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    if (this.customers.length === 0) {
      this.custService.getCustomers().subscribe(
        data => {
          this.customers=data;
          this.loading=false;
          this.message="";
        },
        error => {
          this.message="Error to get the data from backend";
          console.log(error);
          this.loading=false;
          }
      )
    }
  } // get Customers

  edit(customer): void {
    this.selectedCustomer = JSON.parse(JSON.stringify(customer));
    this.submitError = "";
    this.newCustomer=false;
  }

  add() : void {
    this.selectedCustomer = new Customer();
    this.selectedCustomer.name = "NewCustomer";
    this.submitError = "";
    this.newCustomer=true;
  }

  remove(i): void {
    this.index=i;
    this.custService.deleteCustomer(this.customers[i].id).subscribe(
        data => {
          var updatedCustomers = this.customers.slice();
          updatedCustomers.splice(this.index, 1);
          this.customers=updatedCustomers;
          this.message="Remove customer successful";
          this.selectedCustomer=null;
        },
        error =>{
          console.error('Error in removing item...', error)
          alert(`${error.status}: ${error.statusText}`);
          this.message="Error in removing item,... the error is reported to administrator.";
          this.selectedCustomer=null;
          if(error.status == 401){
            this.router.navigate(['log'], { queryParams: { returnUrl: '/inventory' } });
          }
        }
    );

  }


  customerUpdateComplete(response: any){
    console.log('Customer Save Success:', response.success, response.customer)
    if(response.success){
      var customerUpdated = false;
      for(var i = 0; i < this.customers.length; i++){
        if(this.customers[i].id == response.customer.id){
          this.customers[i] = response.customer
          customerUpdated = true;
          console.log('customer updated!');
          break;
        }
      }
      if(!customerUpdated){
        this.customers.push(response.customer);
        console.log('new customer added!', response.item)
      }
      this.selectedCustomer = null;
    } else {
      console.error('ERROR SAVING CUSTOMER', response.error);
      alert(`Error Saving Item: (${response.error.status}) ${response.error.statusText}`);
      if(response.error.status == 401){
        this.router.navigate(['log'], { queryParams: { returnUrl: '/customer' } });
      }
    }
  }
}
