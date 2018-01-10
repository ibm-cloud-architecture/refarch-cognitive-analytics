# Persisting the chat transcripts
To persist the conversation content, we selected a document oriented database running on IBM Cloud, public offering. The Web application can persist the conversation interactions in a single document. The control is done with the parameter `conversation.usePersistence` in the `config.json` under the `server/config` folder.

## Create a Cloudant Service in IBM Cloud  

## Create a Database: wcsdb

## Get service credentials

## Implement service Client
The code is in the `server/routes/features/persist.js`. The method is using cloudant API module, and the conversation response. The code is using the persistId and revId of cloudant response to modify the watson conversation context with those two variables so a unique document is created for all interaction, and the document is updated at each interaction.
```javascript
saveConversation : function(config,conv,next){
  var cloudant = require('cloudant')(config.dbCredentials.url);
  var db = cloudant.use('wcsdb');
  if (conv.context !== undefined) {
    if (conv.context.revId !== undefined) {
      conv._id=conv.context.persistId;
      conv._rev=conv.context.revId;
    }
  }
  db.insert(conv, function(err, data) {
    if (err) {
      next({error: err.message});
    } else {
      next(data);
    }
  });
}, // saveConversation
```

## Browse conversation content in Cloudant console

## Access all conversations from a given timestamp
