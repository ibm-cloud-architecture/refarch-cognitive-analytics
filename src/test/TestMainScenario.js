const request = require('request')

var buildOptions=function(met,aPath){
  return {
    url: "http://localhost:3001"+aPath,
  //  path:apath,
    method: met,
    rejectUnauthorized: true,
    //ca: caCerts,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}
const body ={username: "eddie@email.com", password: "eddie"}
var opts= buildOptions("POST","/login");
console.log(opts)
request(opts,body,function(resp){
  console.log(resp)
})
