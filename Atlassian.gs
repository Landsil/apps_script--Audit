/*******************************************************************************************************************************************
 * List all Jira/Confluence/Trello users with active accounts
 * token from: https://id.atlassian.com/manage-profile/security/api-tokens
 * get users with https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-users-search-get
 *
 * store credentials/username/URL in Project Properties
 */

// Pull Atlassian users
function atlassian() {
  var URL = atlassian_URL+"/rest/api/3/users/search?maxResults=1000"; // From their documentation
  var auth = Utilities.base64Encode(atlassian_user+":"+atlassian_token);
  var headers = {
     "Authorization":"Basic " + auth,
     "Accept": "application/json"
        };
  var options = {
          "method" : "GET",
          "headers": headers
        };
  
  //************************
  // Actuall call using FetchApp
  var response = UrlFetchApp.fetch(URL, options);
  //Logger.log(response); 
  
    //Assebling responce
  var dataAll = JSON.parse(response.getContentText());
  var data = dataAll;
  
  //Logger.log(data)

  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var atlassian_A = SpreadsheetApp.setActiveSheet(ss.getSheetByName("atlassian_A"));
  
  // Clear content except header all the way to "O" column. TODO: make it find cells with content and cleare those.
  atlassian_A.getRange("A2:O").clearContent();
  
  
  //************************
  // Assemble User's data
  // This decided where to post. Starts after header.
  var lastRow = Math.max(atlassian_A.getRange(2, 1).getLastRow(),1);
  var index = 0;
  
  // Populate sheet by looping thru records in out list of dictonaries and pulling data we need into correct columns.
  for(var i = 0; i < data.length; i++ )
  {
    atlassian_A.getRange(index + lastRow + i, 1).setValue(data[i].accountId);
    atlassian_A.getRange(index + lastRow + i, 2).setValue(data[i].accountType);
    atlassian_A.getRange(index + lastRow + i, 3).setValue(data[i].displayName);
    atlassian_A.getRange(index + lastRow + i, 4).setValue(data[i].emailAddress);
    atlassian_A.getRange(index + lastRow + i, 5).setValue(data[i].active);

    //debug >> Full answer
    //atlassian_A.getRange(index + lastRow + i, 10).setValue(data);
  }

// This actually posts data when it's ready instead of making many changes one at a time.
  atlassian_A.sort(1);  // sort by column 1
SpreadsheetApp.flush();
}
