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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }          from './app.component';
import { HomeComponent }         from './home.component';
import { LoginComponent }        from './login/login.component';
import { ConversationComponent}  from './conv/conversation.component';
import { ConversationService }   from './conv/conversation.service';
import { AuthGuard }             from './login/auth.guard';
import { AuthenticationService } from "./login/authentication.service";
import { AlertService }          from "./login/alert.service";
import { CustomersComponent}     from './customer/customers.component';
import { CustomersService }      from './customer/customers.service';
import { CustomerDetailComponent}    from './customer/customer.component';

// Define internal URL mapping to component, protect with authentication guard, meaning user
// needs to be authenticated with a login
const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'log', component: LoginComponent },
  //canActivate: [AuthGuard]
  { path: 'itSupport', component: ConversationComponent,canActivate: [AuthGuard]},
  { path: 'customer', component: CustomersComponent,canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConversationComponent,
    CustomersComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuard,
    ConversationService,
    CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
