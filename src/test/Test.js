const request = require('request')
const btoa = require("btoa");
const wml_credentials = new Map();

wml_credentials.set("url", "https://ibm-watson-ml.mybluemix.net");
//wml_credentials.set("username", "db8df387-a246-47e8-b678-df33df4d1ab9");
//wml_credentials.set("password", "e1f11a41-9199-4306-b20a-8b58407cfda4");
wml_credentials.set("username", "02f481c2-7717-4e79-b60f-3c1214b5f374");
wml_credentials.set("password", "f2f9349b-ebb5-4dfd-9318-94615a06fffb");


request({
  url:wml_credentials.get("url")+ "/v3/identity/token",
  method: "GET",
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: "Basic " + btoa((wml_credentials.get("username") + ":" + wml_credentials.get("password")))
  }},
 function(error,response,body){
  const token=JSON.parse(body).token;
  console.log("Got the token... call the scoring");
  // now call the scoring
  //const payload = '{"fields": ["Sentiment", "Keyword_Component", "Keyword_Query", "ID", "Gender", "Children", "Income", "CarOwnership", "Age", "MaritalStatus", "zipcode", "LongDistance", "International", "Local", "Dropped", "Paymethod", "LocalBilltype", "LongDistanceBilltype", "Usage", "RatePlan", "DeviceOwned", "Preference", "OMPN", "SMSCount"],"values":[["frustrated","none","none","1","M",0,140000,"Y",24,"Married","95051",30,50,200,0,"CC","Budget","Standard",95,3,"ipho","none","Y",1220]]}';
  const payload = '{"fields":["Sentiment","Keyword_Component","Keyword_Query","ID","Gender","Children","Income","CarOwnership","Age","MaritalStatus","zipcode","LongDistance","International","Local","Dropped","Paymethod","LocalBilltype","LongDistanceBilltype","Usage","RatePlan","DeviceOwned","Preference","OMPN","SMSCount"],"values":[["frustrated","none","none","1","M",0,70000,"Y",24,"Single","95051",30,50,200,0,"CC","Budget","Standard",95,3,"ipho","None","Y",1220]]}'
  const scoring_url =
  "https://ibm-watson-ml.mybluemix.net/v3/wml_instances/e947215d-9d96-48d0-bdce-d50e9431ca80/published_models/face8a83-b3e2-4cee-9b5e-76aaf01b3b78/deployments/3233874f-e8bd-459d-afa3-ab1d9ca148f9/online";
  //  "https://ibm-watson-ml.mybluemix.net/v3/wml_instances/e453ba4e-e29c-4d46-8cee-e2be03c36dc2/published_models/5bc9314e-8f68-4414-81c8-8edc617733fe/deployments/32cb6bc0-732f-4502-aa33-90f4740f449c/online";
  request({url:scoring_url,
    method:"POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer '+token
    },
    body: payload
  },function(error,response,body){

    const result = JSON.parse(body)
    console.log(result)
    const churnIdx=result.values[0][43]
    const churn=result.values[0][44]
    console.log(churn+" "+result.values[0][42][churnIdx])
  })
})
