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
import { Injectable } from '@angular/core';
import { Headers, Http,Response,RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from "./User";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(user:User) {
      console.log("login called for "+user.email);
        const body = {username: user.email, password: user.password}
        return this.http.post('/login', body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let tokenResponse = response.json();
                if (tokenResponse && tokenResponse.access_token) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    user.token=tokenResponse.access_token;
                }
                return user;
            })
            .catch((error:any) => {
              return Observable.throw(error || 'Server error')
            });
    } // login
    logout() {
        // remove user from local storage to log user out
        console.log('logout called');
        this.http.get('/logout').subscribe();
        sessionStorage.removeItem('currentUser');
    }
    authenticated() {
      return this.http.get('/api/authenticated', <RequestOptionsArgs>{ withCredentials: true })
        .map((res: Response) => res.json())
    }
}
