import ***REMOVED***Component***REMOVED*** from '@angular/core';
import ***REMOVED*** Router ***REMOVED***   from '@angular/router';
import ***REMOVED*** User ***REMOVED*** from "./login/User";
/*
Main page component to display access to the different demo features.
*/

@Component(***REMOVED***
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
  ***REMOVED***)
  export class HomeComponent ***REMOVED***
    user: User;


    constructor(private router: Router) ***REMOVED***
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    ***REMOVED***

    account()***REMOVED***
      this.router.navigate(['account']);
    ***REMOVED***

    itSupport()***REMOVED***
      this.router.navigate(['itSupport']);
    ***REMOVED***
    // ADD Here methods to be called from HTLM button to route to other component

    bill()***REMOVED***
      this.router.navigate(['bill']);
    ***REMOVED***

    logout()***REMOVED***
      localStorage.removeItem('currentUser');
      this.user=new User();
      this.router.navigate(['log']);
    ***REMOVED***
  ***REMOVED***
