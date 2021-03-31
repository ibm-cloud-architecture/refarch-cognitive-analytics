/**
The auth guard is used to prevent unauthenticated users from accessing restricted routes. Once
a user is logged in, the user information is persisted in a local storage. So the guard verifies
is the user is present or not.
The mechanism use the router to route to the log, but keep the URL entered by the user to navigate to it
once the user is logged in.
*/
﻿import ***REMOVED*** Injectable ***REMOVED*** from '@angular/core';
import ***REMOVED*** Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ***REMOVED*** from '@angular/router';
import ***REMOVED*** AuthenticationService ***REMOVED*** from './authentication.service';
import ***REMOVED*** Observable ***REMOVED*** from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate ***REMOVED***

    constructor(private router: Router, private authService: AuthenticationService)***REMOVED*** ***REMOVED***

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  ***REMOVED***
      return this.authService.authenticated()
        .map((result) => ***REMOVED***
            if (result.authenticated) ***REMOVED***
              return true;
            ***REMOVED*** else ***REMOVED***
              return false;
            ***REMOVED***
        ***REMOVED***)
        .catch(error => ***REMOVED***
          this.router.navigate(['log'], ***REMOVED*** queryParams: ***REMOVED*** returnUrl: state.url ***REMOVED*** ***REMOVED***);
          return Observable.of(false);
        ***REMOVED***);
    ***REMOVED***
***REMOVED***
