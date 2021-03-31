/**
The authentication service is used to login and logout of the application, to
login it posts the users credentials to the api and checks the response for a
JWT token, if there is one it means authentication was successful so the user
details including the token are added to local storage.

The logged in user details are stored in local storage so the user will stay
logged in if they refresh the browser and also between browser sessions until
they logout. If you don't want the user to stay logged in between refreshes or
sessions the behaviour could easily be changed by storing user details somewhere
 less persistent such as session storage or in a property of the authentication
 service.
*/
import ***REMOVED*** Injectable ***REMOVED*** from '@angular/core';
import ***REMOVED*** Headers, Http,Response,RequestOptions, RequestOptionsArgs***REMOVED*** from '@angular/http';
import ***REMOVED*** Observable ***REMOVED*** from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import ***REMOVED*** User ***REMOVED*** from "./User";

@Injectable()
export class AuthenticationService ***REMOVED***
    constructor(private http: Http) ***REMOVED*** ***REMOVED***

    login(user:User) ***REMOVED***
      console.log("login called for "+user.email);
        const body = ***REMOVED***username: user.email, password: user.password***REMOVED***
        return this.http.post('/login', body)
            .map((response: Response) => ***REMOVED***
                // login successful if there's a jwt token in the response
                let tokenResponse = response.json();
                if (tokenResponse && tokenResponse.access_token) ***REMOVED***
                    // store user details and token in local storage to keep user logged in between page refreshes
                    user.token=tokenResponse.access_token;
                ***REMOVED***
                return user;
            ***REMOVED***)
            .catch((error:any) => ***REMOVED***
              return Observable.throw(error || 'Server error')
            ***REMOVED***);
    ***REMOVED*** // login
    logout() ***REMOVED***
        // remove user from local storage to log user out
        console.log('logout called');
        this.http.get('/logout').subscribe();
        sessionStorage.removeItem('currentUser');
    ***REMOVED***
    authenticated() ***REMOVED***
      return this.http.get('/api/authenticated', <RequestOptionsArgs>***REMOVED*** withCredentials: true ***REMOVED***)
        .map((res: Response) => res.json())
    ***REMOVED***
***REMOVED***
