import ***REMOVED***Component, OnInit***REMOVED*** from '@angular/core';
import ***REMOVED*** CustomersService ***REMOVED***  from './customers.service';
import ***REMOVED*** Customer ***REMOVED*** from "./Customer";
import ***REMOVED*** Router ***REMOVED*** from '@angular/router';

@Component(***REMOVED***
    selector: 'customers',
    styleUrls:['customer.css'],
    templateUrl:'customers.component.html'
  ***REMOVED***)

export class CustomersComponent implements OnInit ***REMOVED***
  customers : Customer[]=[];
  message: string = "May take some time to load....";
  loading: boolean= true;
  selectedCustomer: Customer;
  index: number = -1;
  submitError: string;
  newCustomer : boolean = false;

  constructor(private router: Router, private custService : CustomersService)***REMOVED***
  ***REMOVED***

  // Uses in init to load data and not the constructor.
  ngOnInit(): void ***REMOVED***
  ***REMOVED***

  getCustomers(): void ***REMOVED***
    if (this.customers.length === 0) ***REMOVED***
      this.custService.getCustomers().subscribe(
        data => ***REMOVED***
          this.customers=data;
          this.loading=false;
          this.message="";
      ***REMOVED***
        error => ***REMOVED***
          this.message="Error to get the data from backend";
          console.log(error);
          this.loading=false;
          ***REMOVED***
      )
    ***REMOVED***
  ***REMOVED*** // get Customers

  edit(customer): void ***REMOVED***
    this.selectedCustomer = JSON.parse(JSON.stringify(customer));
    this.submitError = "";
    this.newCustomer=false;
  ***REMOVED***

  add() : void ***REMOVED***
    this.selectedCustomer = new Customer();
    this.selectedCustomer.name = "NewCustomer";
    this.submitError = "";
    this.newCustomer=true;
  ***REMOVED***

  remove(i): void ***REMOVED***
    this.index=i;
    this.custService.deleteCustomer(this.customers[i].id).subscribe(
        data => ***REMOVED***
          var updatedCustomers = this.customers.slice();
          updatedCustomers.splice(this.index, 1);
          this.customers=updatedCustomers;
          this.message="Remove customer successful";
          this.selectedCustomer=null;
      ***REMOVED***
        error =>***REMOVED***
          console.error('Error in removing item...', error)
          alert(`$***REMOVED***error.status***REMOVED***: $***REMOVED***error.statusText***REMOVED***`);
          this.message="Error in removing item,... the error is reported to administrator.";
          this.selectedCustomer=null;
          if(error.status == 401)***REMOVED***
            this.router.navigate(['log'], ***REMOVED*** queryParams: ***REMOVED*** returnUrl: '/inventory' ***REMOVED*** ***REMOVED***);
          ***REMOVED***
        ***REMOVED***
    );

  ***REMOVED***


  customerUpdateComplete(response: any)***REMOVED***
    console.log('Customer Save Success:', response.success, response.customer)
    if(response.success)***REMOVED***
      var customerUpdated = false;
      for(var i = 0; i < this.customers.length; i++)***REMOVED***
        if(this.customers[i].id == response.customer.id)***REMOVED***
          this.customers[i] = response.customer
          customerUpdated = true;
          console.log('customer updated!');
          break;
        ***REMOVED***
      ***REMOVED***
      if(!customerUpdated)***REMOVED***
        this.customers.push(response.customer);
        console.log('new customer added!', response.item)
      ***REMOVED***
      this.selectedCustomer = null;
    ***REMOVED*** else ***REMOVED***
      console.error('ERROR SAVING CUSTOMER', response.error);
      alert(`Error Saving Item: ($***REMOVED***response.error.status***REMOVED***) $***REMOVED***response.error.statusText***REMOVED***`);
      if(response.error.status == 401)***REMOVED***
        this.router.navigate(['log'], ***REMOVED*** queryParams: ***REMOVED*** returnUrl: '/customer' ***REMOVED*** ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
