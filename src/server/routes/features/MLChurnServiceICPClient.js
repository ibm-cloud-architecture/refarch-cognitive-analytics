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
 Delegate to a customer churn scoring service deployed inside ICP
 Update 02/09/2018
 */

const request = require('request')
const btoa = require("btoa")
const CommandsFactory = require('hystrixjs').commandFactory;
const customerService = require('./customerProxy')


 module.exports = ***REMOVED***
   scoreCustomer : function(config,req,next)***REMOVED***
     if (config.debug) ***REMOVED***
       console.log("Call churn scoring service for "+JSON.stringify(req.user));
     ***REMOVED***
     customerService.getCustomerDetail(config,req.user.email).then(function(response) ***REMOVED***
         // do data preparation
         var payLoadToScore=buildScoringPayload(req.body.context["ToneAnalysisResponse"].tone_id,JSON.parse(response))
         // call the WML service
         var score = getScoring(config,payLoadToScore).then(function(score)***REMOVED***
             next(***REMOVED***"score":score***REMOVED***)
         ***REMOVED***).catch(function(error)***REMOVED***
             next(***REMOVED***"score":.5***REMOVED***)
         ***REMOVED***);
     ***REMOVED***).catch(function(error)***REMOVED***
        console.error(error)
        next(***REMOVED***"score":.5***REMOVED***)
     ***REMOVED***)
   ***REMOVED***
***REMOVED*** // exports


// ------------------------------------------------------------
// Private
// ------------------------------------------------------------
function getToken(config)***REMOVED***
  return new Promise(function(resolve, reject)***REMOVED***
      request(***REMOVED***
        url:config.scoringService.baseUrl+ "/v3/identity/token",
        method: "GET",
        headers: ***REMOVED***
          accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: "Basic " + btoa(config.scoringService.username + ":" + config.scoringService.password)
        ***REMOVED******REMOVED***,
       function(error,response,body)***REMOVED***
            if (body) ***REMOVED***
              const token=JSON.parse(body).token;
              console.log("Got the token... call the scoring "+body);
              resolve(token)
            ***REMOVED***
            reject(error);
      ***REMOVED***)
  ***REMOVED***)
***REMOVED*** // getToken

// times out calls that take longer, than the configured threshold.
var getTokenServiceCommand = CommandsFactory.getOrCreate("getTokenServiceCommand")
  .run(getToken)
  .timeout(5000)
  .requestVolumeRejectionThreshold(2)
  .build();

function scorePayload(config,token,payload)***REMOVED***
    return new Promise(function(resolve, reject)***REMOVED***
      const scoring_url = config.scoringService.baseUrl+config.scoringService.instance;
      request(***REMOVED***url:scoring_url,
            method:"POST",
            headers: ***REMOVED***
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: 'Bearer '+token
          ***REMOVED***
            body: JSON.stringify(payload)
        ***REMOVED***function(error,response,body)***REMOVED***
              if (body) ***REMOVED***
                const result = JSON.parse(body)
                console.log(result)
                const churnIdx=result.values[0][43]
                const churn=result.values[0][44]
                console.log(churn+" "+result.values[0][42][churnIdx])
                resolve(result.values[0][42][churnIdx]);
              ***REMOVED***
              reject(0.5)
            ***REMOVED***
      ) // scoring request
    ***REMOVED***)
***REMOVED*** // scorePayload

var getScoringServiceCommand = CommandsFactory.getOrCreate("getScoringServiceCommand")
  .run(scorePayload)
  .timeout(5000)
  .requestVolumeRejectionThreshold(2)
  .build();


function buildScoringPayload(sentiment,custRecord)***REMOVED***
  var record = [];
  record.push(sentiment);
  record.push("none");
  record.push("none");
  record.push(custRecord.id.toString());
  record.push(custRecord.gender);
  record.push(custRecord.children);
  record.push(custRecord.estimatedIncome);
  if (custRecord.carOwner === "T") ***REMOVED***
    record.push("Y");
  ***REMOVED*** else ***REMOVED***
    record.push("N");
  ***REMOVED***

  //record.push(custRecord.age);
  record.push(24);
  if (custRecord.maritalStatus === 'Familly') ***REMOVED***
    record.push("Married");
  ***REMOVED*** else ***REMOVED***
    record.push(custRecord.maritalStatus);
  ***REMOVED***

  record.push("95051"); // TODO need to get zipcode in backend
  record.push(custRecord.longDistance);
  record.push(custRecord.international);
  record.push(custRecord.local);
  record.push(custRecord.dropped);
  record.push(custRecord.paymentMethod);
  record.push(custRecord.localBillType);
  record.push(custRecord.longDistanceBillType);
  record.push(custRecord.usage);
  record.push(parseInt(custRecord.ratePlan));
  var devices = custRecord.devicesOwned;
  record.push(devices[0].productName);
  record.push("None"); // TODO need to get  preference
  record.push("Y"); // TODO need to get OMPN
  record.push(1220); // TODO need to get SMScount

  var payload = ***REMOVED***"fields": ["Sentiment", "Keyword_Component", "Keyword_Query", "ID", "Gender", "Children", "Income", "CarOwnership", "Age", "MaritalStatus", "zipcode", "LongDistance", "International", "Local", "Dropped", "Paymethod", "LocalBilltype", "LongDistanceBilltype", "Usage", "RatePlan", "DeviceOwned", "Preference", "OMPN", "SMSCount"]***REMOVED***;
  payload.values=new Array(record);
  console.log(JSON.stringify(payload));
  return payload;
***REMOVED***


function getScoring(config,payload)***REMOVED***
 return new Promise(function(resolve, reject)***REMOVED***
    getTokenServiceCommand.execute(config).then(function(token)***REMOVED***
          getScoringServiceCommand.execute(config,token,payload).then(function(score)***REMOVED***
            resolve(score)
          ***REMOVED***).catch(function(errorMsg)***REMOVED***
                console.error("in catch "+errorMsg);
                reject(0.5)
          ***REMOVED***);
    ***REMOVED***).catch(function(errorMsg)***REMOVED***
      console.error("in catch "+errorMsg);
      reject(***REMOVED***error:errorMsg.Error***REMOVED***);
    ***REMOVED***);
 ***REMOVED***);
***REMOVED*** // get scoring
