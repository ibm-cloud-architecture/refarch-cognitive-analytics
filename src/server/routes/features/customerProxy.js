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
const request = require('request').defaults(***REMOVED***strictSSL: false***REMOVED***);
const CommandsFactory = require('hystrixjs').commandFactory;


var buildOptions=function(met,aPath,config)***REMOVED***
  return ***REMOVED***
    url: config.customerAPI.url+aPath,
    method: met,
    rejectUnauthorized: true,
    //ca: caCerts,
    headers: ***REMOVED***
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-IBM-Client-Id': config.customerAPI.xibmclientid,
      Host: config.customerAPI.host,
    ***REMOVED***
  ***REMOVED***
***REMOVED***

// what run in the command pattern. Must returns a Promise
var run = function(config,email)***REMOVED***
  return new Promise(function(resolve, reject)***REMOVED***
      var opts = buildOptions('GET','/customers/email/'+email,config);
      opts.headers['Content-Type']='multipart/form-data';
      request(opts,function (error, response, body) ***REMOVED***
        if (error) ***REMOVED***reject(error)***REMOVED***
        resolve(body);
      ***REMOVED***);
  ***REMOVED***);
***REMOVED***

// times out calls that take longer, than the configured threshold.
var serviceCommand =CommandsFactory.getOrCreate("getCustomerDetail")
  .run(run)
  .timeout(5000)
  .requestVolumeRejectionThreshold(2)
  .build();


module.exports = ***REMOVED***
  getCustomerByEmail : function(config,email,res)***REMOVED***
    serviceCommand.execute(config,email).then(function(response)***REMOVED***
      res.send(response);
    ***REMOVED***).catch(function(errorMsg)***REMOVED***
      console.error("in catch "+errorMsg);
      res.status(500).send(***REMOVED***error:errorMsg.Error***REMOVED***);
    ***REMOVED***);
***REMOVED***
  getCustomerDetail : function(config,email) ***REMOVED***
      return serviceCommand.execute(config,email);
  ***REMOVED***
***REMOVED*** // export
