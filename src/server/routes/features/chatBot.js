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
module.exports = ***REMOVED***
  chat : function(config,req,res)***REMOVED***
    req.body.context.predefinedResponses="";
    console.log("text "+req.body.text+".")
    // logic to handle WCS response after prompting to user a message
    if (req.body.context.toneAnalyzer && req.body.text !== "" ) ***REMOVED***
        analyzeTone(config,req,res)
    ***REMOVED***
    if (req.body.context.action === "search" && req.body.context.item ==="UserRequests") ***REMOVED***
        getSupportTicket(config,req,res);
    ***REMOVED***
    if (req.body.context.action === "recommend") ***REMOVED***
          odmclient.recommend(config,req.body.context,res, function(contextWithRecommendation)***REMOVED***

            if (config.debug) ***REMOVED***
              console.log('Context back to WCS with recommendation: ' + JSON.stringify(contextWithRecommendation));
            ***REMOVED***
            req.body.context = contextWithRecommendation;
            sendToWCSAndBackToUser(config,req,res);
          ***REMOVED***)
    ***REMOVED***
    if (req.body.context.action === "transfer") ***REMOVED***
        console.log("Transfer to "+ req.body.context.item)
    ***REMOVED***

    if (req.body.context.action === undefined) ***REMOVED***
        sendToWCSAndBackToUser(config,req,res);
    ***REMOVED***
  ***REMOVED*** // chat
***REMOVED***;

// ------------------------------------------------------------
// Private
// ------------------------------------------------------------
/*
Call tone analyzis and when the tone assessment is frustrated call scoring services
Call WCS back
**/
function analyzeTone(config,req,res)***REMOVED***
  toneAnalyzer.analyzeSentence(config,req.body.text).then(function(toneArep) ***REMOVED***
        if (config.debug) ***REMOVED***console.log('Tone Analyzer '+ JSON.stringify(toneArep));***REMOVED***
        var tone=toneArep.utterances_tone[0].tones[0];
        if (tone !== undefined && tone.tone_name !== undefined) ***REMOVED***
          req.body.context["ToneAnalysisResponse"]=tone;
          if (tone.tone_name === "Frustrated") ***REMOVED***
            churnScoring.scoreCustomer(config,req,function(score)***REMOVED***
                      req.body.context["ChurnScore"]=score;
                      sendToWCSAndBackToUser(config,req,res);
                ***REMOVED***)
          ***REMOVED*** else ***REMOVED***
            sendToWCSAndBackToUser(config,req,res);
          ***REMOVED***// frustrated
        ***REMOVED*** else ***REMOVED***
          req.body.context["ToneAnalysisResponse"]=***REMOVED******REMOVED***
          sendToWCSAndBackToUser(config,req,res);
        ***REMOVED***

  ***REMOVED***).catch(function(error)***REMOVED***
      console.error(error);
      res.status(500).send(***REMOVED***'msg':error.Error***REMOVED***);
    ***REMOVED***);
***REMOVED*** // analyzeTone

function getSupportTicket(config,req,res)***REMOVED***
  ticketing.getUserTicket(config,req.body.user.email,function(ticket)***REMOVED***
      if (config.debug) ***REMOVED***
          console.log('Ticket response: ' + JSON.stringify(ticket));
      ***REMOVED***
      req.body.context["Ticket"]=ticket
      sendToWCSAndBackToUser(config,req,res);
  ***REMOVED***)
***REMOVED*** // getSupportTicket

function sendToWCSAndBackToUser(config, req, res)***REMOVED***
  sendMessage(config,req.body,config.watsonassistant.workspace,res).then(function(response) ***REMOVED***
    if (config.debug) ***REMOVED***console.log("\n <<< From WCS "+JSON.stringify(response,null,2));***REMOVED***
    response.text="<p>"+response.output.text[0]+"</p>";
    //  support multiple choices response
    if (response.context.action === "click") ***REMOVED***
        response.text= response.text+ "<br/><a class=\"btn btn-primary\" href=\""+response.context.url+"\">"+response.context.buttonText+"</a>"
    ***REMOVED***
    res.status(200).send(response);
  ***REMOVED***).catch(function(error)***REMOVED***
      console.error(error);
      res.status(500).send(***REMOVED***'text':error.Error***REMOVED***);
    ***REMOVED***);
***REMOVED***

var sendMessage = function(config,message,wkid,res,next)***REMOVED***
  var conversation = new AssistantV1(***REMOVED***
      username: config.watsonassistant.username,
      password: config.watsonassistant.password,
      version: config.watsonassistant.versionDate
    ***REMOVED***);
  return new Promise(function(resolve, reject)***REMOVED***
      if (message.context.conversation_id === undefined) ***REMOVED***
          message.context["conversation_id"]=config.watsonassistant.conversationId;
      ***REMOVED***
      if (config.debug) ***REMOVED***
          console.log("\n--- Connect to Watson Assistant named: " + config.watsonassistant.conversationId);
          console.log(">>> to Assistant "+JSON.stringify(message,null,2));
      ***REMOVED***
      conversation.message(
          ***REMOVED***
          workspace_id: wkid,
          input: ***REMOVED***'text': message.text***REMOVED***,
          context: message.context
        ***REMOVED***
          function(err, response) ***REMOVED***
            if (err) ***REMOVED***
              console.log('error:', err);
              reject(null,***REMOVED***'Error': "Communication error with Watson Service. Please contact your administrator"***REMOVED***);
            ***REMOVED*** else ***REMOVED***
              if (config.watsonassistant.usePersistence) ***REMOVED***
                  response.context.persistId=message.context.persistId;
                  response.context.revId=message.context.revId;
                  persist.saveConversation(config,response,function(persistRep)***REMOVED***
                        response.context.persistId=persistRep.id;
                        response.context.revId=persistRep.rev;
                        console.log("Conversation persisted, response is now: "+JSON.stringify(response,null,2));
                        resolve(response);
                  ***REMOVED***);
              ***REMOVED*** else ***REMOVED***
                  resolve(response);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
      );
   ***REMOVED***); // promise
***REMOVED*** // sendMessage
