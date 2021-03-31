const request = require('request')

var buildOptions=function(met,aPath)***REMOVED***
  return ***REMOVED***
    url: "http://localhost:3001"+aPath,
  //  path:apath,
    method: met,
    rejectUnauthorized: true,
    //ca: caCerts,
    headers: ***REMOVED***
      accept: 'application/json',
      'Content-Type': 'application/json'
    ***REMOVED***
  ***REMOVED***
***REMOVED***
const body =***REMOVED***username: "eddie@email.com", password: "eddie"***REMOVED***
var opts= buildOptions("POST","/login");
console.log(opts)
request(opts,body,function(resp)***REMOVED***
  console.log(resp)
***REMOVED***)
