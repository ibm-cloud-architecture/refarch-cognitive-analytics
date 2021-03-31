import {Component} from '@angular/core';
import { Router }   from '@angular/router';
import { User } from "./login/User";
/*
Main page component to display access to the different demo features.
*/

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
  })
  export class HomeComponent {
    user: User;


    constructor(private router: Router) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    account(){
      this.router.navigate(['account']);
    }

    itSupport(){
      this.router.navigate(['itSupport']);
    }
    // ADD Here methods to be called from HTLM button to route to other component

    bill(){
      this.router.navigate(['bill']);
    }

    logout(){
      localStorage.removeItem('currentUser');
      this.user=new User();
      this.router.navigate(['log']);
    }
  }
