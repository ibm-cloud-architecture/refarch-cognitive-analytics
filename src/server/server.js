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
// Get dependencies
const express = require('express');
const path = require('path');

const passport = require('passport');

const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

// create the app
const app = express();
app.disable('x-powered-by');

const bodyParser =   require('body-parser');
var config = require('./config/config.json');
require('./routes/passport')(passport,config)

app.use(session(***REMOVED***
	name: 'JSESSION',
	secret: '321sessionverysecretsecret123',
	resave: false,
  saveUninitialized: false,
	cookie: ***REMOVED*** secure: false ***REMOVED***, // not using https between browser and bff
	store: new MemoryStore()
***REMOVED***));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(require('cookie-parser')());
// Parsers for POST JSON PAYLOAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(***REMOVED*** extended: true ***REMOVED***));
//app.use(session(***REMOVED***resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat', cookie:***REMOVED***secure: false***REMOVED******REMOVED***));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
// Set our api routes
require('./routes/userlogin')(app, passport);

require('./routes/api')(app,config);

// Catch all other routes and return the index file
app.get('*', (req, res) => ***REMOVED***
  res.sendFile(path.join(__dirname, '../dist/index.html'));
***REMOVED***);

const port = process.env.PORT || config.port;
var server=app.listen(port, '0.0.0.0', function() ***REMOVED***
  console.log("Green Telco Portal UI Server "+ config.version+" starting on " + port);
  console.log("  Use your web browser: http://localhost:"+port);
***REMOVED***);

module.exports = server;
