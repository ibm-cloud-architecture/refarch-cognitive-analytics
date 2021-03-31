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
import ***REMOVED***Component, AfterViewChecked, ElementRef, ViewChild, OnInit***REMOVED*** from '@angular/core';
import ***REMOVED*** FormControl ***REMOVED*** from '@angular/forms';
import ***REMOVED*** ConversationService ***REMOVED***  from './conversation.service';
import ***REMOVED*** Sentence ***REMOVED*** from "./Sentence";





@Component(***REMOVED***
    //moduleId: module.id,
  selector: 'conversation',

    styleUrls:['conversation.css'],
    templateUrl:'conversation.html'
  ***REMOVED***)

export class ConversationComponent implements OnInit, AfterViewChecked ***REMOVED***
  currentDialog : Sentence[]=[];
  profileControl = new FormControl('',[]);
  context:any=***REMOVED***"type":"base"***REMOVED***; // used to keep the Conversation context
  message:string;
  profiles = [  ***REMOVED***value: 'young', viewValue: 'Student'***REMOVED***,
                 ***REMOVED***value: 'retiree', viewValue: 'Retiree'***REMOVED***,
                 ***REMOVED***value: 'adult', viewValue: 'Standard'***REMOVED***,
                 ***REMOVED***value: 'noFiber', viewValue: 'NoFiber'***REMOVED***
              ];
  selectedProfile:string = 'adult';
  selectedValue: string;

  /**
  When creating a conversation component call Watson to get a greetings message as defined in the Dialog. This is more user friendly.
  */
  constructor(private convService : ConversationService)***REMOVED***
    // Uncomment this line if you do not have a conversation_start trigger in a node of your dialog
    this.callConversationBFF("Hello");
  ***REMOVED***

  // Suppot scrolling at the bottom of the window.
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() ***REMOVED***
      this.scrollToBottom();
  ***REMOVED***

  ngAfterViewChecked() ***REMOVED***
      this.scrollToBottom();
  ***REMOVED***

  scrollToBottom(): void ***REMOVED***
      try ***REMOVED***
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      ***REMOVED*** catch(err) ***REMOVED*** ***REMOVED***
  ***REMOVED***

  // variable used for the input field in html page to get user query
  queryString=""

  callConversationBFF(msg:string) ***REMOVED***
    this.context.user=this.selectedProfile;
    this.convService.submitMessage(msg,this.context).subscribe(
      data => ***REMOVED***
        this.context=data.context;
        let s:Sentence = new Sentence();
        s.direction="from-watson";
        s.text="";
        for (var t of data.output.text) ***REMOVED***
            s.text+=t+"<br/>";
        ***REMOVED***
        // manage options - as clickable buttons
        s.options=data.context.predefinedResponses;
        this.currentDialog.push(s);
        // authorize the UI to see all the sentences from WCS even when there is not use input expected,
        // like for example waiting for the best recommendation computed by ODM
        if (data.context.action === "search" || data.context.action === "recommend")***REMOVED***
          this.callConversationBFF("");
        ***REMOVED***
    ***REMOVED***
      error => ***REMOVED***
        return "Error occurs in conversation processing"
        ***REMOVED***
    )
  ***REMOVED***



  submit()***REMOVED***
    let obj:Sentence = new Sentence();
    obj.direction="to-watson";
    obj.text=this.queryString;
    this.currentDialog.push(obj);

    this.callConversationBFF(this.queryString);
    this.queryString="";
  ***REMOVED***


  keyMessage(event)***REMOVED***
     if(event.keyCode == 13) ***REMOVED***
        this.submit();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
