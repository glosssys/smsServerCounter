function doGet(e){return myFunction();
                 }
function myFunction() {

var ACCOUNT_SID = "";
var ACCOUNT_TOKEN = "";
var toPhoneNumber = "";
var numberToRetrieve = 100;
var hoursOffset = 0;
var options = {
   "method" : "get" 
};
options.headers = {
   "Authorization" : "Basic " + Utilities.base64Encode(ACCOUNT_SID + ":" + ACCOUNT_TOKEN)
};
var url="https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages.json?To=" + toPhoneNumber + "&PageSize=" + numberToRetrieve;
var response = UrlFetchApp.fetch(url,options);
// -------------------------------------------
// Parse the JSON data and put it into the spreadsheet's active page.
// Documentation: https://www.twilio.com/docs/api/rest/response
var theSheet = SpreadsheetApp.getActiveSheet();
var theRow = 3;
var startColumn = 2;
var dataAll = JSON.parse(response.getContentText());
dataAll.messages.reverse();
for (i = 0; i < dataAll.messages.length; i++) {
   theColumn = startColumn;
   // -------------------------------------
   // Date and Time
   rowDate = dataAll.messages[i].date_sent;
   var theDate = new Date (rowDate);
   if(isNaN(theDate.valueOf())) {
      theDate = 'Not a valid date-time';
      theColumn++;
      theColumn++;
   }
   else {
      var theTime =theDate.toLocaleTimeString(); 
      theSheet.getRange(theRow, theColumn).setValue(theDate);
      theColumn++;
      theSheet.getRange(theRow, theColumn).setValue(theTime);
      theColumn++;
   }
   // -------------------------------------

   theSheet.getRange(theRow, theColumn).setValue(dataAll.messages[i].from);
   theColumn++;
   theSheet.getRange(theRow, theColumn).setValue(dataAll.messages[i].body);
   theRow++
   }
  
  return HtmlService.createTemplateFromFile("index.html")
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

  


// get the chart data to pass through to front-end
function getChartData() {
  
  var ss = SpreadsheetApp.openById("1NsioK8VIja_3MtY3Pb4ZuhQWE3qNFFLZZLAUhZLWHE8");
  var sheet = ss.getActiveSheet();
  
  var headings = sheet.getRange(1,5,1,2).getValues()[0].map(function(heading) {
    return heading.toLowerCase();
  });
  
  Logger.log(headings);
  
  //var values = sheet.getRange(3, 4, sheet.getLastRow()-3, 2).getValues();
  
 var list = sheet.getRange(3,5, sheet.getLastRow()-2).getValues();
  var counts = {};
  
   list.forEach(function(d) {
      if (!counts[d]) {
        counts[d] = 0;
      }
      counts[d]++;
    });
   var values = Object.keys(counts).map(function(key) {
  return [key, counts[key]];
});
  
  var data = [];
  for (var i=0; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < values[i].length; j++) {
      obj[headings[j]] = values[i][j];
    }
    data.push(obj);
  }
  
  return datax;
 

}


function lookatsheet(){
  var ss = SpreadsheetApp.openById('1NsioK8VIja_3MtY3Pb4ZuhQWE3qNFFLZZLAUhZLWHE8');// the ID of the SS you want to look at
  var sp = PropertiesService.getScriptProperties();
  var oldRows = sp.getProperty("new") || 0; 
  var newRows = ss.getLastRow();
  if (newRows > oldRows) {
     sp.setProperty("new", newRows);
     return true;
     
  }else {

    }
      

}
