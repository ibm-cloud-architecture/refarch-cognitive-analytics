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
 /**
 This module defines the REST api for the front end, and implement some of the
 orchestration logic
  boyerje@us.ibm.com
*/

const express = require('express');
const router = express.Router();
// The application can be the front end to two different color compute model: Brown for integration focus and Orange for integration and cognitive. The mode attribute in the env.json set this
var fs = require('fs');
var path = require('path');
const customer    = require('./features/customerProxy');
const chatBot = require('./features/chatBot');

module.exports = function(app,config)***REMOVED***

  app.get('/api/authenticated', isLoggedIn, function(req, res)***REMOVED***
    var response = ***REMOVED***
        authenticated: true,
    ***REMOVED***
    res.status(200).json(response);
  ***REMOVED***)

  app.post('/api/c/conversation',isLoggedIn,(req,res) => ***REMOVED***
    chatBot.chat(config,req,res)
  ***REMOVED***);


  app.get('/api/cust/customers/email/:email',isLoggedIn, (req,res) => ***REMOVED***
    customer.getCustomerByEmail(config,req.params.email,res);
  ***REMOVED***)
***REMOVED*** // exports

function isLoggedIn(req, res, next) ***REMOVED***
    console.log("IsLoggedin() " + req.user);
    if (req.isAuthenticated())***REMOVED***
      return next();
    ***REMOVED***
    res.status(401).send('unauthenticated');
***REMOVED***
