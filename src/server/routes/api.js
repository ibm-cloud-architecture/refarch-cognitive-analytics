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
const conversation = require('./features/conversation');

module.exports = function(app,config){

  app.get('/api/authenticated', isLoggedIn, function(req, res){
    var response = {
        authenticated: true,
    }
    res.status(200).json(response);
  })

  app.post('/api/c/conversation',isLoggedIn,(req,res) => {
    conversation.itSupport(config,req,res)
  });



  app.get('/api/cust/customers', isLoggedIn,(req,res) => {
    customer.getCustomers(config,req,res);
  })
  app.post('/api/cust/customers',isLoggedIn, (req,res) => {
    customer.newCustomer(config,req,res);
  })
  app.get('/api/cust/customers/:id',isLoggedIn, (req,res) => {
    customer.getCustomer(config,req,res);
  })
  app.put('/api/cust/customers', isLoggedIn,(req,res) => {
    customer.saveCustomer(config,req,res);
  })
  app.delete('/api/cust/customers/:id', isLoggedIn, (req,res) => {
    customer.deleteCustomer(config,req,res);
  })
} // exports

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.status(401).send('unauthenticated');
}
