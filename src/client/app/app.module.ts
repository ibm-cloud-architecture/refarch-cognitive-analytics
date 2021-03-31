/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ***REMOVED*** BrowserModule ***REMOVED*** from '@angular/platform-browser';
import ***REMOVED*** NgModule ***REMOVED*** from '@angular/core';
import ***REMOVED*** FormsModule, ReactiveFormsModule ***REMOVED*** from '@angular/forms';
import ***REMOVED***BrowserAnimationsModule***REMOVED*** from '@angular/platform-browser/animations';
import ***REMOVED*** MatSelectModule, MatFormFieldModule ***REMOVED*** from '@angular/material';
import ***REMOVED*** HttpModule ***REMOVED*** from '@angular/http';
import ***REMOVED*** RouterModule, Routes ***REMOVED*** from '@angular/router';

import ***REMOVED*** AppComponent ***REMOVED***          from './app.component';
import ***REMOVED*** HomeComponent ***REMOVED***         from './home.component';
import ***REMOVED*** LoginComponent ***REMOVED***        from './login/login.component';
import ***REMOVED*** ConversationComponent***REMOVED***  from './conv/conversation.component';
import ***REMOVED*** ConversationService ***REMOVED***   from './conv/conversation.service';
import ***REMOVED*** AuthGuard ***REMOVED***             from './login/auth.guard';
import ***REMOVED*** AuthenticationService ***REMOVED*** from "./login/authentication.service";
import ***REMOVED*** AlertService ***REMOVED***          from "./login/alert.service";
import ***REMOVED*** CustomersComponent***REMOVED***     from './customer/customers.component';
import ***REMOVED*** CustomersService ***REMOVED***      from './customer/customers.service';
import ***REMOVED*** CustomerDetailComponent***REMOVED***    from './customer/customer.component';
import ***REMOVED*** AccountComponent ***REMOVED*** from './account/account.component';

// Define internal URL mapping to component, protect with authentication guard, meaning user
// needs to be authenticated with a login
const routes: Routes = [
  ***REMOVED*** path: 'home', component: HomeComponent,canActivate: [AuthGuard]***REMOVED***,
  ***REMOVED*** path: 'log', component: LoginComponent ***REMOVED***,
  //canActivate: [AuthGuard]
  ***REMOVED*** path: 'itSupport', component: ConversationComponent,canActivate: [AuthGuard]***REMOVED***,
  ***REMOVED*** path: 'customer', component: CustomersComponent,canActivate: [AuthGuard]***REMOVED***,
  ***REMOVED*** path: 'account', component: AccountComponent,canActivate: [AuthGuard]***REMOVED***,
  // otherwise redirect to home
  ***REMOVED*** path: '**', redirectTo: 'home' ***REMOVED***
]

@NgModule(***REMOVED***
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConversationComponent,
    CustomersComponent,
    CustomerDetailComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuard,
    ConversationService,
    CustomersService],
  bootstrap: [AppComponent]
***REMOVED***)
export class AppModule ***REMOVED*** ***REMOVED***
