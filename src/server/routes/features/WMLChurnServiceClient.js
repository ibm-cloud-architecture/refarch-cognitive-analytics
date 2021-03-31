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
 Delegate to a customer churn scoring service.
 Update 02/09/2018
 */

const request = require('request')
const btoa = require("btoa")
const CommandsFactory = require('hystrixjs').commandFactory;
const customerService = require('./customerProxy')


 module.exports = {
   scoreCustomer : function(config,req,next){
     if (config.debug) {
       console.log("Call churn scoring service for "+JSON.stringify(req.user));
     }
     customerService.getCustomerDetail(config,req.user.email).then(function(response) {
         // do data preparation
         var payLoadToScore=buildScoringPayload(req.body.context["ToneAnalysisResponse"].tone_id,JSON.parse(response))
         // call the WML service
         var score = getScoring(config,payLoadToScore).then(function(score){
             next({"score":score})
         }).catch(function(error){
             next({"score":.5})
         });
     }).catch(function(error){
        console.error(error)
        next({"score":.5})
     })
   }
} // exports


// ------------------------------------------------------------
// Private
// ------------------------------------------------------------
function getToken(config){
  return new Promise(function(resolve, reject){
      request({
        url:config.scoringService.baseUrl+ "/v3/identity/token",
        method: "GET",
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: "Basic " + btoa(config.scoringService.username + ":" + config.scoringService.password)
        }},
       function(error,response,body){
            if (body) {
              const token=JSON.parse(body).token;
              console.log("Got the token... call the scoring "+body);
              resolve(token)
            }
            reject(error);
      })
  })
} // getToken

// times out calls that take longer, than the configured threshold.
var getTokenServiceCommand = CommandsFactory.getOrCreate("getTokenServiceCommand")
  .run(getToken)
  .timeout(5000)
  .requestVolumeRejectionThreshold(2)
  .build();

function scorePayload(config,token,payload){
    return new Promise(function(resolve, reject){
      const scoring_url = config.scoringService.baseUrl+config.scoringService.instance;
      request({url:scoring_url,
            method:"POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: 'Bearer '+token
            },
            body: JSON.stringify(payload)
          },function(error,response,body){
              if (body) {
                const result = JSON.parse(body)
                console.log(result)
                const churnIdx=result.values[0][43]
                const churn=result.values[0][44]
                console.log(churn+" "+result.values[0][42][churnIdx])
                resolve(result.values[0][42][churnIdx]);
              }
              reject(0.5)
            }
      ) // scoring request
    })
} // scorePayload

var getScoringServiceCommand = CommandsFactory.getOrCreate("getScoringServiceCommand")
  .run(scorePayload)
  .timeout(5000)
  .requestVolumeRejectionThreshold(2)
  .build();


function buildScoringPayload(sentiment,custRecord){
  var record = [];
  record.push(sentiment);
  record.push("none");
  record.push("none");
  record.push(custRecord.id.toString());
  record.push(custRecord.gender);
  record.push(custRecord.children);
  record.push(custRecord.estimatedIncome);
  if (custRecord.carOwner === "T") {
    record.push("Y");
  } else {
    record.push("N");
  }

  //record.push(custRecord.age);
  record.push(24);
  if (custRecord.maritalStatus === 'Familly') {
    record.push("Married");
  } else {
    record.push(custRecord.maritalStatus);
  }

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

  var payload = {"fields": ["Sentiment", "Keyword_Component", "Keyword_Query", "ID", "Gender", "Children", "Income", "CarOwnership", "Age", "MaritalStatus", "zipcode", "LongDistance", "International", "Local", "Dropped", "Paymethod", "LocalBilltype", "LongDistanceBilltype", "Usage", "RatePlan", "DeviceOwned", "Preference", "OMPN", "SMSCount"]};
  payload.values=new Array(record);
  console.log(JSON.stringify(payload));
  return payload;
}


function getScoring(config,payload){
 return new Promise(function(resolve, reject){
    getTokenServiceCommand.execute(config).then(function(token){
          getScoringServiceCommand.execute(config,token,payload).then(function(score){
            resolve(score)
          }).catch(function(errorMsg){
                console.error("in catch "+errorMsg);
                reject(0.5)
          });
    }).catch(function(errorMsg){
      console.error("in catch "+errorMsg);
      reject({error:errorMsg.Error});
    });
 });
} // get scoring
