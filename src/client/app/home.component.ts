import {Component} from '@angular/core';
import { Router }   from '@angular/router';
import { HomeService }  from './home.service';
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


    constructor(private router: Router,private homeService : HomeService) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    account(){
      this.router.navigate(['account']);
    }

    itSupport(){
      this.router.navigate(['itSupport']);
    }
    // ADD Here methods to be called from HTLM button to route to other component

    logout(){
        localStorage.removeItem('currentUser');
        this.user=new User();
        this.router.navigate(['log']);
    }

    bill(){
      this.router.navigate(['bill']);
    }
  }
