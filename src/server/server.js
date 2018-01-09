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

app.use(session({
	name: 'JSESSION',
	secret: '321sessionverysecretsecret123',
	resave: false,
  saveUninitialized: false,
	store: new MemoryStore()
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(require('cookie-parser')());
// Parsers for POST JSON PAYLOAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat', cookie:{secure: false}}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
// Set our api routes
require('./routes/userlogin')(app, passport);

require('./routes/api')(app,config);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || config.port;
var server=app.listen(port, '0.0.0.0', function() {
  console.log("Brown UI Server "+ config.version+" starting on " + port);
  console.log("  Use your web browser: http://localhost:"+port);
});

module.exports = server;
