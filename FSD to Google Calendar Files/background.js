// Copyright 2020 Luke Pyburn
// JP Squared, Inc., All rights reserved.

// Create the context menu
var cmSendToCalendar = chrome.contextMenus.create({ "id": "FSD-to-Google-Calendar", "title": "FSD to Google Calendar", "contexts": ["all"], "onclick": SendToCalendarOuter});

// Automatically reloads the tab that FSD is running in if the FSD to Google Calendar context menu item is clicked.
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "FSD-to-Google-Calendar") {
  	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
 };
});

// Do all the things
function SendToCalendarOuter(data, tab) {
    // Preserve newlines in the selection
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        if (selection) {
            // selection[0] contains text including line breaks
            SendToCalendar(selection[0], tab);
        } else if (data.selectionText) {
            // data.selectionText contains text without line breaks
            SendToCalendar(data.selectionText, tab);
        } else {
            SendToCalendar(" ", tab);
        }
    });
}

function SendToCalendar(selection, tab) {

    // Max URI length is 2000 chars, but let's keep under 1800
    // to also allow a buffer for google login/redirect urls etc.
    // (This limit is not a hard limit in the code,
    // but we don't surpass it by more than a few tens of chars.)
    var maxLength = 1800;

    // Start building the URL
	var url = "http://www.google.com/calendar/event?action=TEMPLATE";
    
    // Gets current date and time to be placed at the start of Event Title
    var today = new Date();
    var monthOfYear = today.getMonth()+1;
	var dayOfMonth = today.getDate();

    // Parses selection for a client name
    var clientName = selection.match(/\n^[a-z ,.'-]+$/im);
     
     
    //Parses selection for a US formatted phone number
     var phoneNumber = selection.match(/(^(^1\s?-)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4})/m);
     // Script executes if both client name and phone number 
     // are present   
         if (clientName && phoneNumber) {
     // Date, Client Name, and Phone number go to Event Title
        url += "&text=" +TrimURITo(monthOfYear+"/"+dayOfMonth+" "+clientName[0] + " " + phoneNumber[0], maxLength - url.length)
     }
     // Only Date and Client Name are added to Event Title 
     // if Phone Number is missing or formatted improperly
         else if (clientName)  {
        url += "&text=" +TrimURITo(monthOfYear+"/"+dayOfMonth+" "+clientName[0] + " ", maxLength - url.length)
     }
     // Only Date and Phone Number are added to Event Title
     // if Client Name is missing or improperly formatted
         else if (phoneNumber) {
        url += "&text=" +TrimURITo(monthOfYear+"/"+dayOfMonth+" "+ phoneNumber[0], maxLength - url.length)
     }
     // If both Client Name and Phone Number are missing 
     // or imprroperly formatted, only Date is added to Event Title
         else {
     	url += "&text=" +TrimURITo(monthOfYear+"/"+dayOfMonth+" ", maxLength - url.length)
     };
     
    // Parses selection for a US formatted address
    var address = selection.match(/\n(\d+\s+[':.,\s\w-]*?,\s*[A-Za-z]+\s*\d{0,5},\s*[U][S][A])/m);

    if (address) {
      
        // Location goes to Location
        url += "&location=" + TrimURITo(address[1], maxLength - url.length);
    }

    // Get the current date and time
		var today = new Date();
		var monthOfYear = today.getMonth()+1;
		var dayOfMonth = today.getDate();
    // Determines if the current day of the month and/or 
    // month of the year are less than or equal to 9.
    // If either (or both) are true, the fucntion adds 
    // a leading zero to them in the URI, as required by Google Calendar.
		if (monthOfYear <= 9 && dayOfMonth <= 9)
		{
			var date = today.getFullYear()+'0'+(today.getMonth()+1)+'0'+dayOfMonth
			}
		else if (monthOfYear <= 9 && dayOfMonth > 9) {
			var date = today.getFullYear()+'0'+(today.getMonth()+1)+''+dayOfMonth
		}
		else if (monthOfYear > 9 && dayOfMonth <= 9) {
			var date = today.getFullYear()+''+(today.getMonth()+1)+'0'+dayOfMonth
		}
		else if (monthOfYear > 9 && dayOfMonth > 9)
		{
			var date = today.getFullYear()+''+(today.getMonth()+1)+''+dayOfMonth
			}
    // If either the day or the month cannot be determined,
    // the date variable is set to null
        else {
        	var date = ""
        };
		var time = 6 + today.getHours() + '0000';
		var endTime = 7 + today.getHours() + '0000';
		var dateTime = date + 'T'+time + 'Z' + '/' + date + 'T' + endTime +'Z';
	//Date and time go to Date
		url += "&dates=" + TrimURITo(dateTime, maxLength-url.length);

    // Selection goes to end of details, and to ctext (google calendar quick add),
    // (trim to half of the available length because it's twice in the URI)
    // ctext is also prepended with tab.title,
    // so that Google Calendar can use it to generate the text,
    // but can also include other info.
    var title = TrimURITo(tab.title + "\n", maxLength - url.length);
    var selection = TrimURITo(selection, (maxLength - url.length)/2 - title.length);
  
    // Open the created url in a new tab
	chrome.tabs.create({ "url": url}, function (tab) {
	});

    // Trim text so that its URI encoding fits into the length limit
    // and return its URI encoding
function TrimURITo(text, length) {
    var textURI = encodeURI(text);
    if (textURI.length > length) {
    // Different charsets can lead to a different blow-up after passing the
    // text through encodeURI, so let's estimate the blow up first,
    // and then trim the text so that it fits the limit...
        var blowUp = textURI.length/text.length;
        var newLength = Math.floor(length / blowUp) - 3;  // -3 for "..."
        do {
            // trim the text & show that it was trimmed...
            text = text.substring(0, newLength) + "...";
            textURI = encodeURI(text);
            newLength = Math.floor(0.9 * newLength);
        } while (textURI.length > length);
    }
    return textURI;
}
}


// Inline FSD button test

// Create the FSD auto select button in a container div.  It will be styled and
// positioned with CSS.
//function addButton (){
//chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//        chrome.tabs.executeScript({file: "button.js", file: "buttonStyle.css", runAt: "document_start"});
//        });
//};
// End of test
