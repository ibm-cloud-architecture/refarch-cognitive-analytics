# Persisting the chat transcripts

To persist the conversation content, we selected a document oriented database running on IBM Cloud, public offering. The Web application can persist the conversation interactions in a single document. The control is done with the parameter `conversation.usePersistence` in the `config.json` under the `server/config` folder.

## Pre-requisite

You need to have an active account on [IBM Cloud](https://console.bluemix.net/dashboard/apps/), an organization and a space created.

## Create a Cloudant Service in IBM Cloud  

Use the `Create resource` button on top of the main IBM Cloud dashboard page, select `Data & Analytics` under the Platform category and then the `Cloudant NoSQL DB` service:  
![](./cloudant-db.png)

Be sure to select the region, organization and space you want to service to be added to.

Once created go to the service main page and `Launch` the client tool to create new database.
![](./cloudant-main.png)

This web application helps administrators to access database instances.

## Create a Database: wcsdb

From the top menu select `Create Database` and enter `wcsdb` as a name:   

![](cloudant-create-db.png)

The main database dashboard is now displayed. We do not need to create any document yet, as the code will do it.

## Get service credentials

So to make to code accessing the database we need to get the service credentials. At the Cloudant service main page select `Service Credentials` and add a `new credential`.

![](cloudant-serv-cred.png)

Open the `config.json file` to add the URL of the service and enable persistence in the conversation settings.

ATTENTION: when deploying into IBM Cloud private the configuration is defined in the deployment configuration. So you may want to tune both.

```json
"watsonassistant": ***REMOVED***
  "usePersistence": false
***REMOVED***,
"dbCredentials" : ***REMOVED***
  "url": "https://...-bluemix:cd....@...e50-bluemix.cloudant.com"
***REMOVED***,
```

## Implement service client

The code is in the `server/routes/features/persist.js`. The method is using Cloudant API module, and the conversation response. The code is using the persistId and revId of cloudant response to modify the Watson Assistant context with those two variables so a unique document is created for all interaction, and the document is updated at each interaction.
```javascript
saveConversation : function(config,conv,next)***REMOVED***
  var cloudant = require('cloudant')(config.dbCredentials.url);
  var db = cloudant.use('wcsdb');
  if (conv.context !== undefined) ***REMOVED***
    if (conv.context.revId !== undefined) ***REMOVED***
      conv._id=conv.context.persistId;
      conv._rev=conv.context.revId;
    ***REMOVED***
  ***REMOVED***
  db.insert(conv, function(err, data) ***REMOVED***
    if (err) ***REMOVED***
      next(***REMOVED***error: err.message***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      next(data);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***, // saveConversation
```

## Browse conversation content in Cloudant console

After few conversation sessions, you can access some of the created documents using the Cloudant console:   
![](wcsdb-docs.png)  

Each document has a unique ID and revision id. All the content of the conversation is persisted.

![](conv-view.png)  

It is helpful for assessing the conversation that did not terminate well, or with gaps in the scope of the dialog.

### Access all conversations from a given timestamp

The `persist.js` add a timestamp variable in the persisted document so queries can be done on the document creation date. Cloudant exposes a query editor to search for documents in the database. The query is a JSON document.
