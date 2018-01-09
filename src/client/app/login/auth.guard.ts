/**
The auth guard is used to prevent unauthenticated users from accessing restricted routes. Once
a user is logged in, the user information is persisted in a local storage. So the guard verifies
is the user is present or not.
The mechanism use the router to route to the log, but keep the URL entered by the user to navigate to it
once the user is logged in.
*/
﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {
      return this.authService.authenticated()
        .map((result) => {
            if (result.authenticated) {
              return true;
            } else {
              return false;
            }
        })
        .catch(error => {
          this.router.navigate(['log'], { queryParams: { returnUrl: state.url } });
          return Observable.of(false);
        });
    }
}
