/*******************************************************************************************************************************************
 * Pull a list of microsoft 360 users
 * https://docs.microsoft.com/en-us/graph/api/resources/users?view=graph-rest-1.0
 * testing at: https://developer.microsoft.com/en-us/graph/graph-explorer
 * https://docs.microsoft.com/en-us/graph/api/reportroot-getoffice365activeuserdetail?view=graph-rest-1.0 
 *
 *
 */
function Microsoft_users() {
  //var URL = "https://graph.microsoft.com/v1.0/users"; // User details, no licence info
  var URL = "https://graph.microsoft.com/v1.0/reports/getOffice365ActivationsUserDetail"; // test at: https://developer.microsoft.com/en-us/graph/graph-explorer
  var options = {
          "method" : "GET",
        };
  
  //************************
  // Actuall call using FetchApp
  //var response = UrlFetchApp.fetch(URL, { headers: { Authorization: `Bearer ${tokens["access_token"]}` } });   // https://docs.microsoft.com/en-us/advertising/scripts/examples/fetch-resources
  var response = UrlFetchApp.fetch(URL, { headers: { Authorization: `Bearer ${microsoft_token}` } }); // For testing with token from https://developer.microsoft.com/en-us/graph/graph-explorer
  
  //Logger.log(response)
  
  //Assebling responce
  var csvData = Utilities.parseCsv(response);
  
  //Logger.log(csvData)

  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Office_A = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Office_A"));
  
  // Clear content except header all the way to "O" column. TODO: make it find cells with content and cleare those.
  Office_A.getRange("A:Y").clearContent();
  Office_A.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
  
SpreadsheetApp.flush(); // This actually posts data when it's ready instead of making many changes one at a time.
}
