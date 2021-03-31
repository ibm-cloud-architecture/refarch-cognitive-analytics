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
 * Jerome Boyer IBM boyerje@us.ibm.com
 */
var request = require('request');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
var persist = require('./persist');
var ticketing = require('./ticketingClient');
var toneAnalyzer = require('./toneAnalyzerClient');
var churnScoring = require('./WMLChurnServiceClient');
var odmclient = require('./ODMClient');
/**
Function to support the logic of integrating all the services and interact with Watson Conversation.
When the conversation context includes toneAnalyzis, call the service
*/
module.exports = {
  chat : function(config,req,res){
    req.body.context.predefinedResponses="";
    console.log("text "+req.body.text+".")
    // logic to handle WCS response after prompting to user a message
    if (req.body.context.toneAnalyzer && req.body.text !== "" ) {
        analyzeTone(config,req,res)
    }
    if (req.body.context.action === "search" && req.body.context.item ==="UserRequests") {
        getSupportTicket(config,req,res);
    }
    if (req.body.context.action === "recommend") {
          odmclient.recommend(config,req.body.context,res, function(contextWithRecommendation){

            if (config.debug) {
              console.log('Context back to WCS with recommendation: ' + JSON.stringify(contextWithRecommendation));
            }
            req.body.context = contextWithRecommendation;
            sendToWCSAndBackToUser(config,req,res);
          })
    }
    if (req.body.context.action === "transfer") {
        console.log("Transfer to "+ req.body.context.item)
    }

    if (req.body.context.action === undefined) {
        sendToWCSAndBackToUser(config,req,res);
    }
  } // chat
};

// ------------------------------------------------------------
// Private
// ------------------------------------------------------------
/*
Call tone analyzis and when the tone assessment is frustrated call scoring services
Call WCS back
**/
function analyzeTone(config,req,res){
  toneAnalyzer.analyzeSentence(config,req.body.text).then(function(toneArep) {
        if (config.debug) {console.log('Tone Analyzer '+ JSON.stringify(toneArep));}
        var tone=toneArep.utterances_tone[0].tones[0];
        if (tone !== undefined && tone.tone_name !== undefined) {
          req.body.context["ToneAnalysisResponse"]=tone;
          if (tone.tone_name === "Frustrated") {
            churnScoring.scoreCustomer(config,req,function(score){
                      req.body.context["ChurnScore"]=score;
                      sendToWCSAndBackToUser(config,req,res);
                })
          } else {
            sendToWCSAndBackToUser(config,req,res);
          }// frustrated
        } else {
          req.body.context["ToneAnalysisResponse"]={}
          sendToWCSAndBackToUser(config,req,res);
        }

  }).catch(function(error){
      console.error(error);
      res.status(500).send({'msg':error.Error});
    });
} // analyzeTone

function getSupportTicket(config,req,res){
  ticketing.getUserTicket(config,req.body.user.email,function(ticket){
      if (config.debug) {
          console.log('Ticket response: ' + JSON.stringify(ticket));
      }
      req.body.context["Ticket"]=ticket
      sendToWCSAndBackToUser(config,req,res);
  })
} // getSupportTicket

function sendToWCSAndBackToUser(config, req, res){
  sendMessage(config,req.body,config.watsonassistant.workspace,res).then(function(response) {
    if (config.debug) {console.log("\n <<< From WCS "+JSON.stringify(response,null,2));}
    response.text="<p>"+response.output.text[0]+"</p>";
    //  support multiple choices response
    if (response.context.action === "click") {
        response.text= response.text+ "<br/><a class=\"btn btn-primary\" href=\""+response.context.url+"\">"+response.context.buttonText+"</a>"
    }
    res.status(200).send(response);
  }).catch(function(error){
      console.error(error);
      res.status(500).send({'text':error.Error});
    });
}

var sendMessage = function(config,message,wkid,res,next){
  var conversation = new AssistantV1({
      username: config.watsonassistant.username,
      password: config.watsonassistant.password,
      version: config.watsonassistant.versionDate
    });
  return new Promise(function(resolve, reject){
      if (message.context.conversation_id === undefined) {
          message.context["conversation_id"]=config.watsonassistant.conversationId;
      }
      if (config.debug) {
          console.log("\n--- Connect to Watson Assistant named: " + config.watsonassistant.conversationId);
          console.log(">>> to Assistant "+JSON.stringify(message,null,2));
      }
      conversation.message(
          {
          workspace_id: wkid,
          input: {'text': message.text},
          context: message.context
          },
          function(err, response) {
            if (err) {
              console.log('error:', err);
              reject(null,{'Error': "Communication error with Watson Service. Please contact your administrator"});
            } else {
              if (config.watsonassistant.usePersistence) {
                  response.context.persistId=message.context.persistId;
                  response.context.revId=message.context.revId;
                  persist.saveConversation(config,response,function(persistRep){
                        response.context.persistId=persistRep.id;
                        response.context.revId=persistRep.rev;
                        console.log("Conversation persisted, response is now: "+JSON.stringify(response,null,2));
                        resolve(response);
                  });
              } else {
                  resolve(response);
              }
            }
          }
      );
   }); // promise
} // sendMessage
