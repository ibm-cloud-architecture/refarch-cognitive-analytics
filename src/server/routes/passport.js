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
//passport.js
var LocalStrategy = require('passport-local').Strategy;

/**
In this implementation we do not need to go to an internal LDAP server. The config does not
need to have the back end login url specified. This is a mocked up implementation.
*/
module.exports = function(passport,config) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy(
      {
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        var user = { username:username,password:password,email:username}
        if ("tester" === username || "bobbuilder@email.com" === username || "eddie@email.com" === username || "jane@email.com" === username ) {
          done(null,user)
        } else {
            done("Userid unknown", null);
        }
      }
     ));
};
