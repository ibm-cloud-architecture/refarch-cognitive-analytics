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
This module delegate the recommendation to a decision service deployed on ODM platform.
Author: IBM - Jerome Boyer / Guilhem Molines
*/
var http = require('http');
var crmClient = require('./crmClient');

module.exports=  {
  /**
  The wcsresponse is the Conversation response. ODM will use its variables set in the context, plus extra data to take a decision.
  ODM output will be added to the Conversation context as well.
  */
  recommend : function(config,wcscontext,response,next){
    // TODO assess if in the wcscontext there is the user profile with the products he owns if not
    // call the customer microservice and inject it. To do so we need to modify the xom see zen #466 
    // Config for the POST to the ODM Rule Execution Server
    var options = {
      protocol: config.odm.protocol,
      hostname: config.odm.hostname,
      port: config.odm.port,
      path: config.odm.path,
      method: 'POST',
      headers: {
         "accept": "application/json",
         "content-type": "application/json",
         Authorization: config.odm.authtoken
      }
    }
	if (config.debug) {
		console.log("Options: " + JSON.stringify(options));
    console.log("Response from WCS to handle: " + JSON.stringify(wcscontext));
	}

	var req = http.request(options, function(res) {
		if (config.debug) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
		}
    if (res.statusCode === 200){
    		res.setEncoding('utf8');
    		// the 'data' event is sent when the server responds with a data chunk.
    		// This is where we grab this data - which is the Decision output -
    		// and add it back to the Watson Conversation context
    		res.on('data', function (chunk) {
      			if (config.debug) {
          			console.log('Received from ODM: ' + chunk);
          	}
            Object.assign(wcscontext,JSON.parse(chunk));
            next(wcscontext);
    		 });
    } else {
        console.log('Problem with Recommendation  from ODM: ' + res.statusCode);
        next(wcscontext);
    }
    });


	// uploads the ODM input data in the POST call
  prepareODMInputData(config,wcscontext, function(data){
    // for ODM just send the context
    if (config.debug) {
      console.log('Sending data: ' + data);
    }
    req.write(data);
    req.end();
  });

 } // recommend function
} // exports

// ------------------------------------------------------------
// Private
// ------------------------------------------------------------


// Computes the data that we need to upload to ODM for taking the Decision
// The choice here is to include two things:
// - the context part of the Watson Conversation response. This is where data that has been gathered
//   by the bot during the conversation are stored, and the Decision Services may rely on some of these
// data to take decision
var prepareODMInputData = function(config,wcscontext,next) {
  crmClient.getUserProfile(config,wcscontext.user, function(data) {
      c = {}
      data['newZipCode']=wcscontext.ZipCode;
      c['customer']=data;
      next(JSON.stringify(c));
   }
  )
} // prepareODMInputData
