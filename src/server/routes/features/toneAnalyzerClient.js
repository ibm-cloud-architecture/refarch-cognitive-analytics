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
 * Jerome Boyer IBM boyerje@us.ibm.com
 */
var ToneAnalyzerV3=require('watson-developer-cloud/tone-analyzer/v3');

var buildOptions = function(config){
  return {
    username: config.toneAnalyzer.username,
    password: config.toneAnalyzer.password,
    version_date: config.toneAnalyzer.versionDate
  }
}

module.exports = {
  analyzeSentence : function(config,message,res){
      return new Promise(function(resolve, reject){
          var tone_analyzer = new ToneAnalyzerV3(buildOptions(config));
          var params = {
            utterances: [{"text":message}]
          };

          tone_analyzer.tone_chat(params, function(error, response) {
            if (error) {
              console.error('error:', error);
              reject(null,error);
            }
            else {
              resolve(response);
            }
          });
      }); // promise
  } // analyseSentence
} // exports
