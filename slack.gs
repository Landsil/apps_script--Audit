/*******************************************************************************************************************************************
 * List all slack users with active accounts
 * https://api.slack.com/methods/users.list
 * You will need to make a slack app with access to API https://api.slack.com/apps 
 * store credentials in Project Properties
 */

function Slack_users() {
  var URL = "https://slack.com/api/users.list"; // From their documentation.
  var userList = {
           "token": slack_token,           // We are calling our project properties variable
           "limit": 1500                   // No limit? use less for testing. Tested at 1500, https://api.slack.com/docs/pagination
                };
  var options = {
          "method" : "post",
          "payload" : userList,
        };
  
  //************************
  // Actuall call using FetchApp
  var response = UrlFetchApp.fetch(URL, options);
  
  //Assebling responce
  var dataAll = JSON.parse(response.getContentText());
  var data = dataAll.members;
  
  Logger.log(data)

  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Slack_A = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Slack_A"));
  
  // Clear content except header all the way to "O" column. TODO: make it find cells with content and cleare those.
  Slack_A.getRange("A2:O").clearContent();
  
  
//************************
// Assemble User's data
  // This decided where to post. Starts after header.
  var lastRow = Math.max(Slack_A.getRange(2, 1).getLastRow(),1);
  var index = 0;
  
  
  // Populate sheet by looping thru records in out list of dictonaries and pulling data we need into correct columns.
  for(var i = 0; i < data.length; i++ )
  {
    // For 1st lvl values / keys
    Slack_A.getRange(index + lastRow + i, 1).setValue(data[i].id);
    
    // This data sit in an array in JSON, you have to specify all steps to get there. Put it in >> (things||"" << to post empty space if there is no data.
    var display_name_normalized = (data[i] && data[i].profile && data[i].profile && data[i].profile.display_name_normalized)||""; Slack_A.getRange(lastRow + i, 2).setValue(display_name_normalized);
    var real_name_normalized = (data[i] && data[i].profile && data[i].profile && data[i].profile.real_name_normalized)||""; Slack_A.getRange(lastRow + i, 3).setValue(real_name_normalized);
    var email = (data[i] && data[i].profile && data[i].profile && data[i].profile.email)||""; Slack_A.getRange(lastRow + i, 4).setValue(email);
    
    Slack_A.getRange(index + lastRow + i, 5).setValue(data[i].deleted);    
    Slack_A.getRange(index + lastRow + i, 6).setValue(data[i].is_admin);
    Slack_A.getRange(index + lastRow + i, 7).setValue(data[i].is_restricted);
    Slack_A.getRange(index + lastRow + i, 8).setValue(data[i].is_ultra_restricted);
    
    //debug >> Full answer
    //Slack_A.getRange(index + lastRow + i, 10).setValue(data);
  }

// This actually posts data when it's ready instead of making many changes one at a time.
  Slack_A.sort(1);  // sort by column 1
SpreadsheetApp.flush();
}
