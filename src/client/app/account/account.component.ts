import { Component, OnInit } from '@angular/core';
import { CustomersService }  from '../customer/customers.service';
import { Customer } from "../customer/Customer";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  customer: Customer = {
      "firstName": "Bob",
      "lastName": "Builder",
      "emailAddress": "bobbuilder@email.com",
      "age": 24,
      "profession": "Engineer",
      "gender": "M",
      "children": 1,
      "estimatedIncome": 40000,
      "carOwner": "N",
      "id": 1,
      "name": "Bob Builder",
      "type": "Person",
      "status": "S",
      "accountNumber": "ACT01",
      "longDistance": 25,
      "longDistanceBillType": "Standard",
      "international": 0,
      "local": 206,
      "balance": 150,
      "usage": 231,
      "dropped": 0,
      "paymentMethod": "CC",
      "localBillType": "Budget",
      "ratePlan": "3",
      "churn": "T",
      "zipcode": "95051",
      "deviceOwned": "ipho",
      "maritalStatus": "Married",
      "mostDominantTone": "NotEvaluated",
      "churnRisk": 0
  };

  constructor(customerService : CustomersService) {}

  ngOnInit() {
  }

}
