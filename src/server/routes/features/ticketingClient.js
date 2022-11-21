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
 Delegate to a Ticket management API. Here is is just a mockup from now.
 Update 01/18/2018
 */

// mockup of the ticket data source
var tickets = {}
tickets["eddie@email.com"]={"status":"Rejected","reason":"Your current selected offering does not qualify for the second free phone "};


module.exports=  {
    getUserTicket: function(config,user,next){
      // config to be used later when doing http request
      var c= tickets[user];
      next(c);
    }
 }
