webpackJsonp(["main"],{

/***/ "../../../../../client/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../client/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../client/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--This is really the placeholder to support top and bottom parts of the page + the internal content derived\nfrom the routing mechanism -->\n<div class=\"container\" >\n    <div class=\"jumbotron\" style=\"background-image: url(assets/images/top.png)\">\n\n    <h2 style=\"color:white\">Green Telco Portal</h2>\n    </div>\n    <router-outlet></router-outlet>\n    <footer>\n      <p>&copy; IBM | Cloud Architecture Service Engineering | {{version}} </p>\n    </footer>\n</div>\n"

/***/ }),

/***/ "../../../../../client/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.version = "v0.0.1 1/08/2018";
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../client/app/app.component.html")
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../client/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../client/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_component__ = __webpack_require__("../../../../../client/app/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login_component__ = __webpack_require__("../../../../../client/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__conv_conversation_component__ = __webpack_require__("../../../../../client/app/conv/conversation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__conv_conversation_service__ = __webpack_require__("../../../../../client/app/conv/conversation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_service__ = __webpack_require__("../../../../../client/app/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_auth_guard__ = __webpack_require__("../../../../../client/app/login/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_authentication_service__ = __webpack_require__("../../../../../client/app/login/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_alert_service__ = __webpack_require__("../../../../../client/app/login/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__customer_customers_component__ = __webpack_require__("../../../../../client/app/customer/customers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__customer_customers_service__ = __webpack_require__("../../../../../client/app/customer/customers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__customer_customer_component__ = __webpack_require__("../../../../../client/app/customer/customer.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
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

















// Define internal URL mapping to component, protect with authentication guard, meaning user
// needs to be authenticated with a login
var routes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_6__home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_11__login_auth_guard__["a" /* AuthGuard */]] },
    { path: 'log', component: __WEBPACK_IMPORTED_MODULE_7__login_login_component__["a" /* LoginComponent */] },
    //canActivate: [AuthGuard]
    { path: 'itSupport', component: __WEBPACK_IMPORTED_MODULE_8__conv_conversation_component__["a" /* ConversationComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_11__login_auth_guard__["a" /* AuthGuard */]] },
    { path: 'customer', component: __WEBPACK_IMPORTED_MODULE_14__customer_customers_component__["a" /* CustomersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_11__login_auth_guard__["a" /* AuthGuard */]] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_7__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_8__conv_conversation_component__["a" /* ConversationComponent */],
            __WEBPACK_IMPORTED_MODULE_14__customer_customers_component__["a" /* CustomersComponent */],
            __WEBPACK_IMPORTED_MODULE_16__customer_customer_component__["a" /* CustomerDetailComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forRoot(routes)
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__login_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_12__login_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_11__login_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_9__conv_conversation_service__["a" /* ConversationService */],
            __WEBPACK_IMPORTED_MODULE_15__customer_customers_service__["a" /* CustomersService */],
            __WEBPACK_IMPORTED_MODULE_10__home_service__["a" /* HomeService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../client/app/conv/Sentence.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sentence; });
var Sentence = (function () {
    function Sentence() {
    }
    return Sentence;
}());

//# sourceMappingURL=Sentence.js.map

/***/ }),

/***/ "../../../../../client/app/conv/conversation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__conversation_service__ = __webpack_require__("../../../../../client/app/conv/conversation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sentence__ = __webpack_require__("../../../../../client/app/conv/Sentence.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConversationComponent = (function () {
    /**
    When creating a conversation component call Watson to get a greetings message as defined in the Dialog. This is more user friendly.
    */
    function ConversationComponent(convService) {
        this.convService = convService;
        this.currentDialog = [];
        this.context = { "type": "base" }; // used to keep the Conversation context
        // variable used for the input field in html page to get user query
        this.queryString = "";
        // Uncomment this line if you do not have a conversation_start trigger in a node of your dialog
        this.callConversationBFF("Hello");
    }
    ConversationComponent.prototype.callConversationBFF = function (msg) {
        var _this = this;
        this.convService.submitMessage(msg, this.context).subscribe(function (data) {
            _this.context = data.context;
            var s = new __WEBPACK_IMPORTED_MODULE_2__Sentence__["a" /* Sentence */]();
            s.direction = "from-watson";
            s.text = data.output.text[0];
            _this.currentDialog.push(s);
        }, function (error) {
            return "Error occurs in conversation processing";
        });
    };
    ConversationComponent.prototype.submit = function () {
        var obj = new __WEBPACK_IMPORTED_MODULE_2__Sentence__["a" /* Sentence */]();
        obj.direction = "to-watson";
        obj.text = this.queryString;
        this.currentDialog.push(obj);
        this.callConversationBFF(this.queryString);
        this.queryString = "";
    };
    ConversationComponent.prototype.keyMessage = function (event) {
        if (event.keyCode == 13) {
            this.submit();
        }
    };
    return ConversationComponent;
}());
ConversationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        //moduleId: module.id,
        selector: 'conversation',
        styles: [__webpack_require__("../../../../../client/app/conv/conversation.css")],
        template: __webpack_require__("../../../../../client/app/conv/conversation.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__conversation_service__["a" /* ConversationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__conversation_service__["a" /* ConversationService */]) === "function" && _a || Object])
], ConversationComponent);

var _a;
//# sourceMappingURL=conversation.component.js.map

/***/ }),

/***/ "../../../../../client/app/conv/conversation.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".conversation-container {\n  border-style: solid;\n  max-width: 900px;\n  margin: 30px auto;\n  border-width : 2px;\n  border-radius: 8px;\n  border-color: #blue;\n}\n\n.scrolling-box {\n  padding: 0px 5px;\n  height: calc(100vh - 200px);\n  max-height: 600px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.message-box {\n  margin: 20px 0px;\n  overflow: hidden;\n}\n\n.to-watson {\n    margin-left: 30%;\n}\n.to-watson-icon {\n  float: right;\n  font-size: 40px;\n}\n.to-watson-text {\n  padding: 0px 20px;\n  border-radius: 20px;\n  float: right;\n  background: #a9ef1c;\n  color:white;\n  max-width: calc(100% - 60px);\n}\n\n.from-watson {\n  max-width: 70%;\n}\n.from-watson-icon {\n  float: left;\n}\n.from-watson-text {\n  background: #8bc9ef;\n  padding: 15px 20px;\n  border-radius: 20px;\n  float: left;\n  color:blue;\n  max-width: calc(100% - 60px);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../client/app/conv/conversation.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"collapse navbar-collapse\" id=\"main-navbar\">\n  <ul class=\"nav navbar-nav\">\n      <li class=\"\"><a [routerLink]=\"['/']\">Home</a></li>\n  </ul>\n</div>\n<div class='row'>\n  <div class='col-xs-4'>\n    <p>Welcome to Green Telco Support:</p>\n    <ul>\n      <li>I do not understand my rate plan</li>\n    </ul>\n  <br/>\n</div>\n  <div class=\"col-xs-8\">\n     <div class=\"conversation-container\">\n        <div class=\"scrolling-box\">\n          <div *ngFor=\"let p of currentDialog\">\n             <div class=\"message-box\">\n               <div class=\"{{p.direction}}\">\n                  <div class=\"{{p.direction+'-icon'}}\" >\n                    <span *ngIf=\"p.direction === 'to-watson'\" class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\n                    <div *ngIf=\"p.direction === 'from-watson'\" class=\"from-watson-icon\">\n                      <img src='assets/images/watson-globe.png' style='width:50px'>\n                    </div>\n                  </div>\n                  <div class=\"{{p.direction+'-text'}}\" [innerHTML]=\"p.text\">\n                  </div>\n                </div>\n            </div>\n          </div>\n        </div>\n        <form class=\"form-inline\" autocomplete=\"off\" (keydown)=\"keyMessage($event)\">\n            <div class=\"form-group \" style=\"padding:20px\">\n                <input class=\"form-control message-box\"\n                       type=\"text\"\n                       size=\"60\"\n                       [(ngModel)]=\"queryString\"\n                       placeholder=\"Send a message to Support Bot!\"\n                       name=\"queryString\"\n                       autocomplete=\"off\"/>\n                <button class=\"btn btn-primary\" (click)=\"submit()\" type=\"button\">Send</button>\n            </div>\n        </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../client/app/conv/conversation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConversationService = (function () {
    function ConversationService(http) {
        this.http = http;
        this.convUrl = '/api/c/conversation/';
    }
    ;
    ConversationService.prototype.submitMessage = function (msg, ctx) {
        var bodyString = JSON.stringify({ text: msg, context: ctx });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.convUrl, bodyString, options)
            .map(function (res) { return res.json(); });
    };
    return ConversationService;
}());
ConversationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ConversationService);

var _a;
//# sourceMappingURL=conversation.service.js.map

/***/ }),

/***/ "../../../../../client/app/customer/Customer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Customer; });
var Customer = (function () {
    function Customer() {
    }
    return Customer;
}());

//# sourceMappingURL=Customer.js.map

/***/ }),

/***/ "../../../../../client/app/customer/customer.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"customer\" class=\"row\">\n  <h2>{{customer.name}} details!</h2>\n  <p>{{message}}</p>\n  <div><label>id: </label>{{customer.id}}</div>\n  <div class=\"form-group\">\n      <label for=\"name\">Name</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.name\" name=\"name\" id=\"name\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"firstName\">First Name</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.firstName\" name=\"firstName\" id=\"firstName\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"lastName\">Last Name</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.lastName\" name=\"lastName\" id=\"lastName\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"emailAddress\">Email Address</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.emailAddress\" name=\"emailAddress\" id=\"emailAddress\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"age\">Age</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.age\" name=\"age\" id=\"age\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"gender\">Gender</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.gender\" name=\"gender\" id=\"gender\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"status\">Status</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.status\" name=\"status\" id=\"status\">\n  </div>\n  <div>\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"save()\">Save</button>\n      <button class=\"btn glyphicon glyphicon-book\" type=\"button\" (click)=\"viewAccount()\"></button>\n  </div>\n</div>\n<div *ngIf=\"account\" class=\"row\">\n  <div class=\"form-group\">\n      <label for=\"accountNumber\">Account Number</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.accountNumber\" name=\"accountNumber\" id=\"accountNumber\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"balance\">Balance</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.balance\" name=\"balance\" id=\"balance\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"local\">Local Usage</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.local\" name=\"local\" id=\"local\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"longDistance\">Long Distance</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.longDistance\" name=\"longDistance\" id=\"longDistance\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"international\">International</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.international\" name=\"international\" id=\"international\">\n  </div>\n  <div class=\"form-group\">\n      <label for=\"paymentMethod\">Payment Method</label>\n      <input autofocus type=\"text\" class=\"form-control\" required [(ngModel)]=\"customer.paymentMethod\" name=\"paymentMethod\" id=\"paymentMethod\">\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../client/app/customer/customer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customers_service__ = __webpack_require__("../../../../../client/app/customer/customers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Customer__ = __webpack_require__("../../../../../client/app/customer/Customer.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CustomerDetailComponent = (function () {
    // delegate the call to BFF via local service
    function CustomerDetailComponent(customerService) {
        this.customerService = customerService;
        // specify to the parent we are done with editing -> saving
        this.onComplete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.message = "";
        this.account = false;
    }
    CustomerDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.newCustomer) {
            this.customerService.saveCustomer(this.customer).subscribe(function (data) {
                console.log('data from saveCustomer', data);
                _this.customer = data;
                _this.customer.id = data[0].id;
                _this.message = "Success";
                _this.onComplete.emit({ success: true, customer: _this.customer });
            }, function (error) {
                console.error("Error on save operation:" + error);
                _this.message = "Error on save";
                _this.onComplete.emit({ success: false, customer: _this.customer, error: error });
            });
        }
        else {
            this.customerService.updateCustomer(this.customer).subscribe(function (data) {
                // this.item=data;
                _this.message = "Success";
                _this.onComplete.emit({ success: true, customer: _this.customer });
            }, function (error) {
                console.error("Error on update operation:" + error);
                _this.message = "Error on update";
                _this.onComplete.emit({ success: false, customer: _this.customer, error: error });
            });
        }
    };
    CustomerDetailComponent.prototype.viewAccount = function () {
        this.account = !this.account;
    };
    return CustomerDetailComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Customer__["a" /* Customer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Customer__["a" /* Customer */]) === "function" && _a || Object)
], CustomerDetailComponent.prototype, "customer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Boolean)
], CustomerDetailComponent.prototype, "newCustomer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], CustomerDetailComponent.prototype, "onComplete", void 0);
CustomerDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'customer-detail',
        template: __webpack_require__("../../../../../client/app/customer/customer.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__customers_service__["a" /* CustomersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__customers_service__["a" /* CustomersService */]) === "function" && _b || Object])
], CustomerDetailComponent);

var _a, _b;
//# sourceMappingURL=customer.component.js.map

/***/ }),

/***/ "../../../../../client/app/customer/customer.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.customers {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.customers li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.customers li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.customers li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.customers .text {\n  position: relative;\n  top: -3px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../client/app/customer/customers.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"collapse navbar-collapse\" id=\"main-navbar\">\n  <ul class=\"nav navbar-nav\">\n      <li class=\"\"><a [routerLink]=\"['/']\">Home</a></li>\n  </ul>\n</div>\n<h2>Customer Management  <i *ngIf=\"loading\" class=\"fa fa-cog fa-spin fa-3x fa-fw\"></i> <span><button class=\"btn btnbg glyphicon glyphicon-plus\" type=\"button\" (click)=\"add()\"></button></span></h2>\n<div class=\"row\">\n  <p>{{message}}</p>\n  <div class=\"col-md-7\" *ngIf=\"!loading\">\n      <table id=\"dataTable\" class=\"table table-striped table-condensed\">\n        <thead>\n          <tr>\n            <th>Id</th>\n            <th>Name</th>\n            <th>Gender</th>\n            <th>Email</th>\n            <th>Status</th>\n            <th style=\"background-color: white; border-width:0;\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"customers\" *ngFor=\"let customer of customers;let i = index\">\n             <td>{{customer.id}}</td>\n             <td>{{customer.name}}</td>\n             <td>{{customer.gender}}</td>\n             <td>{{customer.emailAddress}}</td>\n             <td>{{customer.status}}</td>\n             <td style=\"background-color: white; border-width:0;\">\n               <button class=\"btn glyphicon glyphicon-edit\" type=\"button\"  (click)=\"edit(customer)\"></button>\n               <button class=\"btn glyphicon glyphicon-trash\" type=\"button\" (click)=\"remove(i)\"></button>\n             </td>\n           </tr>\n         </tbody>\n       </table>\n     </div>\n     <div class=\"col-md-5\" *ngIf=\"selectedCustomer\">\n       <customer-detail [customer]=\"selectedCustomer\" [newCustomer]=\"newCustomer\" (onComplete)=\"customerUpdateComplete($event)\"></customer-detail>\n     </div>\n</div>\n"

/***/ }),

/***/ "../../../../../client/app/customer/customers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customers_service__ = __webpack_require__("../../../../../client/app/customer/customers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Customer__ = __webpack_require__("../../../../../client/app/customer/Customer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomersComponent = (function () {
    function CustomersComponent(router, custService) {
        this.router = router;
        this.custService = custService;
        this.customers = [];
        this.message = "May take some time to load....";
        this.loading = true;
        this.index = -1;
        this.newCustomer = false;
    }
    // Uses in init to load data and not the constructor.
    CustomersComponent.prototype.ngOnInit = function () {
        this.getCustomers();
    };
    CustomersComponent.prototype.getCustomers = function () {
        var _this = this;
        if (this.customers.length === 0) {
            this.custService.getCustomers().subscribe(function (data) {
                _this.customers = data;
                _this.loading = false;
                _this.message = "";
            }, function (error) {
                _this.message = "Error to get the data from backend";
                console.log(error);
                _this.loading = false;
            });
        }
    }; // get Customers
    CustomersComponent.prototype.edit = function (customer) {
        this.selectedCustomer = JSON.parse(JSON.stringify(customer));
        this.submitError = "";
        this.newCustomer = false;
    };
    CustomersComponent.prototype.add = function () {
        this.selectedCustomer = new __WEBPACK_IMPORTED_MODULE_2__Customer__["a" /* Customer */]();
        this.selectedCustomer.name = "NewCustomer";
        this.submitError = "";
        this.newCustomer = true;
    };
    CustomersComponent.prototype.remove = function (i) {
        var _this = this;
        this.index = i;
        this.custService.deleteCustomer(this.customers[i].id).subscribe(function (data) {
            var updatedCustomers = _this.customers.slice();
            updatedCustomers.splice(_this.index, 1);
            _this.customers = updatedCustomers;
            _this.message = "Remove customer successful";
            _this.selectedCustomer = null;
        }, function (error) {
            console.error('Error in removing item...', error);
            alert(error.status + ": " + error.statusText);
            _this.message = "Error in removing item,... the error is reported to administrator.";
            _this.selectedCustomer = null;
            if (error.status == 401) {
                _this.router.navigate(['log'], { queryParams: { returnUrl: '/inventory' } });
            }
        });
    };
    CustomersComponent.prototype.customerUpdateComplete = function (response) {
        console.log('Customer Save Success:', response.success, response.customer);
        if (response.success) {
            var customerUpdated = false;
            for (var i = 0; i < this.customers.length; i++) {
                if (this.customers[i].id == response.customer.id) {
                    this.customers[i] = response.customer;
                    customerUpdated = true;
                    console.log('customer updated!');
                    break;
                }
            }
            if (!customerUpdated) {
                this.customers.push(response.customer);
                console.log('new customer added!', response.item);
            }
            this.selectedCustomer = null;
        }
        else {
            console.error('ERROR SAVING CUSTOMER', response.error);
            alert("Error Saving Item: (" + response.error.status + ") " + response.error.statusText);
            if (response.error.status == 401) {
                this.router.navigate(['log'], { queryParams: { returnUrl: '/customer' } });
            }
        }
    };
    return CustomersComponent;
}());
CustomersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'customers',
        styles: [__webpack_require__("../../../../../client/app/customer/customer.css")],
        template: __webpack_require__("../../../../../client/app/customer/customers.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__customers_service__["a" /* CustomersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__customers_service__["a" /* CustomersService */]) === "function" && _b || Object])
], CustomersComponent);

var _a, _b;
//# sourceMappingURL=customers.component.js.map

/***/ }),

/***/ "../../../../../client/app/customer/customers.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomersService = (function () {
    function CustomersService(http) {
        this.http = http;
        this.custUrl = '/api/cust';
    }
    ;
    CustomersService.prototype.getCustomers = function () {
        return this.http.get(this.custUrl + '/customers')
            .map(function (res) {
            return res.json();
        });
    };
    CustomersService.prototype.saveCustomer = function (c) {
        return this.http.post(this.custUrl + '/customers', { customer: c }).map(function (res) { return res.json(); });
    };
    CustomersService.prototype.updateCustomer = function (c) {
        return this.http.put(this.custUrl + '/customers', { customer: c }).map(function (res) { return res.json(); });
    };
    CustomersService.prototype.deleteCustomer = function (idx) {
        return this.http.delete(this.custUrl + '/customers/' + idx)
            .map(function (res) {
            return res.json();
        });
    };
    return CustomersService;
}());
CustomersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CustomersService);

var _a;
//# sourceMappingURL=customers.service.js.map

/***/ }),

/***/ "../../../../../client/app/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".roundRect {\n   margin: auto;\n   border-width : 2px;\n   border-radius: 8px;\n   border-style: solid;\n   border-color: #blue;\n   background-color: white;\n   box-shadow: 10px 10px 5px #blue;\n   margin-right: 15px;\n   margin-bottom: 15px;\n     padding: 20px;\n   marging: 10px;\n   height:220px;\n   width:280px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../client/app/home.component.html":
/***/ (function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\n  <li><a (click)=\"logout()\">Logout</a></li>\n</ol>\n<div class=\"row\">\n  <h3 *ngIf=\"user\">Welcome to the new myGreen Telco {{user.email}} </h3>\n  <div class=\"col-md-6 roundRect\" style=\"box-shadow: 5px 5px 1px #05870b; border-color: #05870b;\">\n        <h2>Total Balance</h2>\n        <p>Manage your payment</p>\n        <p><button (click)=\"bill()\" class=\"btn btn-secondary\">See my bill</button></p>\n  </div>\n  <div class=\"col-md-6 roundRect\" style=\"box-shadow: 5px 5px 1px #v; border-color: #05870b;\">\n        <h2>Plan</h2>\n        <p>Your plan</p>\n        <p><button (click)=\"account()\" class=\"btn btn-secondary\">Account</button></p>\n  </div>\n  <div class=\"col-md-6 roundRect\" style=\"box-shadow: 5px 5px 1px #05870b; border-color: #05870b;\">\n        <h2>Support Help</h2>\n        <p>Get help</p>\n        <p><button (click)=\"itSupport()\" class=\"btn btn-primary\">Ask me</button></p>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../client/app/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_service__ = __webpack_require__("../../../../../client/app/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_User__ = __webpack_require__("../../../../../client/app/login/User.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
Main page component to display access to the different demo features.
*/
var HomeComponent = (function () {
    function HomeComponent(router, homeService) {
        this.router = router;
        this.homeService = homeService;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    HomeComponent.prototype.account = function () {
        this.router.navigate(['account']);
    };
    HomeComponent.prototype.itSupport = function () {
        this.router.navigate(['itSupport']);
    };
    // ADD Here methods to be called from HTLM button to route to other component
    HomeComponent.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.user = new __WEBPACK_IMPORTED_MODULE_3__login_User__["a" /* User */]();
        this.router.navigate(['log']);
    };
    HomeComponent.prototype.bill = function () {
        this.router.navigate(['bill']);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'home',
        styles: [__webpack_require__("../../../../../client/app/home.component.css")],
        template: __webpack_require__("../../../../../client/app/home.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__home_service__["a" /* HomeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__home_service__["a" /* HomeService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../client/app/home.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
General control service to control the features to expose
*/
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
        this.invUrl = '/api';
    }
    ;
    // this method is used to control the user interface features.  
    HomeService.prototype.getMode = function () {
        return this.http.get(this.invUrl + '/mode')
            .map(function (res) { return res.json(); });
    };
    return HomeService;
}());
HomeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], HomeService);

var _a;
//# sourceMappingURL=home.service.js.map

/***/ }),

/***/ "../../../../../client/app/login/User.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=User.js.map

/***/ }),

/***/ "../../../../../client/app/login/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 The alert service enables any component in the application to display alert messages
 at the top of the page via the alert component.
 It has methods for displaying success and error messages, and a getMessage() method
 that returns an Observable that is used by the alert component to subscribe to
 notifications for whenever a message should be displayed
*/



var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
], AlertService);

var _a;
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ "../../../../../client/app/login/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__("../../../../../client/app/login/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
The auth guard is used to prevent unauthenticated users from accessing restricted routes. Once
a user is logged in, the user information is persisted in a local storage. So the guard verifies
is the user is present or not.
The mechanism use the router to route to the log, but keep the URL entered by the user to navigate to it
once the user is logged in.
*/







var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.authService.authenticated()
            .map(function (result) {
            if (result.authenticated) {
                return true;
            }
            else {
                return false;
            }
        })
            .catch(function (error) {
            _this.router.navigate(['log'], { queryParams: { returnUrl: state.url } });
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(false);
        });
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../client/app/login/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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





var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (user) {
        console.log("login called for " + user.email);
        var body = { username: user.email, password: user.password };
        return this.http.post('/login', body)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var tokenResponse = response.json();
            if (tokenResponse && tokenResponse.access_token) {
                // store user details and token in local storage to keep user logged in between page refreshes
                user.token = tokenResponse.access_token;
            }
            return user;
        })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].throw(error || 'Server error');
        });
    }; // login
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        console.log('logout called');
        this.http.get('/logout').subscribe();
        sessionStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.authenticated = function () {
        return this.http.get('/api/authenticated', { withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthenticationService);

var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../client/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n  <div class=\"col-md-7\">\n    <h4><i>Welcome to the Case Inc Portal Application!</i></h4>\n    <h4>News</h4>\n    <p>This application illustrates a customer churn scoring using Watson cognitive services, hybrid integration and machine learning model deployed as service with public and private cloud as described in the public github repository <a href=\"https://github.com/ibm-cloud-architecture/refarch-cognitive-analytics\">cognitive & analytics reference implementation</a> \n  </div>\n  <div class=\"col-md-5\">\n    <h2>Login</h2>\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n          <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted }\">\n              <label for=\"email\">email</label>\n              <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\" #email=\"ngModel\" required />\n              <div *ngIf=\"f.submitted && !email.valid\" class=\"help-block\">Email address is required</div>\n          </div>\n          <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n              <label for=\"password\">Password</label>\n              <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\" #password=\"ngModel\" required />\n              <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\n          </div>\n          <div class=\"form-group\">\n              <button [disabled]=\"loggingIn\" class=\"btn btn-primary\"><span *ngIf=\"!loggingIn\">Login</span><span *ngIf=\"loggingIn\">Logging in...</span></button>\n              <!-- <a [routerLink]=\"['/signUp']\" class=\"btn btn-link\">Register</a> -->\n          </div>\n      </form>\n      <p style=\"color: red;\">\n        {{errorMessage}}\n      </p>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../client/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__("../../../../../client/app/login/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__("../../../../../client/app/login/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__User__ = __webpack_require__("../../../../../client/app/login/User.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
Supports exposing the login forms and calls the back end service, persist the user in local storage
and route to the return url.
*/
var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__User__["a" /* User */]();
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        console.log('logging out user - login component');
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.errorMessage = ''; // clear error on begin login
        this.loggingIn = true;
        this.authenticationService.login(this.user)
            .subscribe(function (data) {
            _this.loggingIn = true;
            _this.user = data;
            sessionStorage.setItem('currentUser', JSON.stringify(_this.user));
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.loggingIn = false;
            _this.errorMessage = error.status + ": " + error.statusText;
            _this.alertService.error(error);
            _this.authenticationService.logout();
            _this.router.navigate(['/']);
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authenticationService.logout();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'login',
        template: __webpack_require__("../../../../../client/app/login/login.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../client/environments/environment.prod.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.prod.js.map

/***/ }),

/***/ "../../../../../client/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../client/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__ = __webpack_require__("../../../../../client/environments/environment.prod.ts");
/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
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




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment_prod__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../client/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map