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
This module perists the conversation content to a cloudant DB. It implements the data access object patterb
Author: IBM - Jerome Boyer
*/



module.exports=  ***REMOVED***
  saveConversation : function(config,conv,next)***REMOVED***
    var cloudant = require('cloudant')(config.dbCredentials.url);
    var db = cloudant.use('wcsdb');
    if (conv.context !== undefined) ***REMOVED***
      if (conv.context.revId !== undefined) ***REMOVED***
        conv._id=conv.context.persistId;
        conv._rev=conv.context.revId;
        conv.ts= new Date();
      ***REMOVED***
    ***REMOVED***
    db.insert(conv, function(err, data) ***REMOVED***
      if (err) ***REMOVED***
        next(***REMOVED***error: err.message***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        next(data);
      ***REMOVED***
    ***REMOVED***);
***REMOVED*** // saveConversation
  getAllConversations: function(cid,next)***REMOVED***
    var cloudantquery = ***REMOVED***
      "selector": ***REMOVED***
        "conv_id": cid
      ***REMOVED***
    ***REMOVED***;
    db.find(cloudantquery, function(err, data) ***REMOVED***
      if (err) ***REMOVED***
        next(***REMOVED***error: err.message***REMOVED***)
      ***REMOVED*** else ***REMOVED***
        next(data.docs);
      ***REMOVED***
    ***REMOVED***);
***REMOVED***
  getConversationById: function(id,next)***REMOVED***
    var cloudantquery = ***REMOVED***
      "selector": ***REMOVED***
        "_id": id
      ***REMOVED***
    ***REMOVED***;
    db.find(cloudantquery, function(err, data) ***REMOVED***
      if (err) ***REMOVED***
        next(***REMOVED***error: err.message***REMOVED***)
      ***REMOVED*** else ***REMOVED***
        if(data.docs.length > 0)***REMOVED***
          next(data.docs[0]);
        ***REMOVED*** else ***REMOVED***
          next(***REMOVED***error: 'no conversation found with _id: ' + id***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
