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
 /**
 Delegate to CRM API. Here is is just a mockup from now.
 Update 01/15/2018
 */

// mockup of the customer data source
var customers = ***REMOVED******REMOVED***
customers["young"] = ***REMOVED***"age":18,"existingProduct":***REMOVED***"productCategory":"ADSL"***REMOVED******REMOVED***;
customers["student"] = ***REMOVED***"age":18,"existingProduct":***REMOVED***"productCategory":"ADSL"***REMOVED******REMOVED***;
customers["noFiber"] = ***REMOVED***"age":30,"existingProduct":***REMOVED***"productCategory":"ADSL"***REMOVED******REMOVED***;
customers["retiree"] = ***REMOVED***"age":65,"existingProduct":***REMOVED***"productCategory":"ADSL"***REMOVED******REMOVED***;
customers["adult"] = ***REMOVED***"age":36,"existingProduct":***REMOVED***"productCategory":"ADSL"***REMOVED******REMOVED***;

module.exports=  ***REMOVED***
    getUserProfile: function(config,user,next)***REMOVED***
      // config to be used later when doing http request
      var c= customers[user];
      next(c);
    ***REMOVED***
 ***REMOVED***
