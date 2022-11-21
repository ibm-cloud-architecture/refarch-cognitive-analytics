import { Component } from '@angular/core';
import { Router }   from '@angular/router';
import { User } from './login/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    version:string ="v0.0.5 05-15-2018";
    user: User;

    constructor(private router: Router) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.user= null;
        this.router.navigate(['log']);
    }

    home(){
      this.router.navigate(['home']);
    }
}
