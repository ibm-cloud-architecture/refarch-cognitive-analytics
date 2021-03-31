import ***REMOVED*** Component ***REMOVED*** from '@angular/core';
import ***REMOVED*** Router ***REMOVED***   from '@angular/router';
import ***REMOVED*** User ***REMOVED*** from './login/User';

@Component(***REMOVED***
  selector: 'app-root',
  templateUrl: './app.component.html'
***REMOVED***)
export class AppComponent ***REMOVED***
    version:string ="v0.0.5 05-15-2018";
    user: User;

    constructor(private router: Router) ***REMOVED***
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    ***REMOVED***

    logout()***REMOVED***
        localStorage.removeItem('currentUser');
        this.user= null;
        this.router.navigate(['log']);
    ***REMOVED***

    home()***REMOVED***
      this.router.navigate(['home']);
    ***REMOVED***
***REMOVED***
