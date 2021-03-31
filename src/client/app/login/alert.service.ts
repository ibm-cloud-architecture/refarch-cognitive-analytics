/**
 The alert service enables any component in the application to display alert messages
 at the top of the page via the alert component.
 It has methods for displaying success and error messages, and a getMessage() method
 that returns an Observable that is used by the alert component to subscribe to
 notifications for whenever a message should be displayed
*/
import ***REMOVED*** Injectable ***REMOVED*** from '@angular/core';
import ***REMOVED*** Router, NavigationStart ***REMOVED*** from '@angular/router';
import ***REMOVED*** Observable ***REMOVED*** from 'rxjs';
import ***REMOVED*** Subject ***REMOVED*** from 'rxjs/Subject';

@Injectable()
export class AlertService ***REMOVED***
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) ***REMOVED***
        // clear alert message on route change
        router.events.subscribe(event => ***REMOVED***
            if (event instanceof NavigationStart) ***REMOVED***
                if (this.keepAfterNavigationChange) ***REMOVED***
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                ***REMOVED*** else ***REMOVED***
                    // clear alert
                    this.subject.next();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***

    success(message: string, keepAfterNavigationChange = false) ***REMOVED***
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next(***REMOVED*** type: 'success', text: message ***REMOVED***);
    ***REMOVED***

    error(message: string, keepAfterNavigationChange = false) ***REMOVED***
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next(***REMOVED*** type: 'error', text: message ***REMOVED***);
    ***REMOVED***

    getMessage(): Observable<any> ***REMOVED***
        return this.subject.asObservable();
    ***REMOVED***
***REMOVED***
