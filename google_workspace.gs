/*******************************************************************************************************************************************
 * Lists users in a G Suite domain.
 * Create a spreedsheet, name one sheer "GSuite_A" enable API's as needed.
 * You will need to enable at least Direcory API and admin SDK
 * https://developers.google.com/admin-sdk/directory/v1/reference/users/list
 * https://developers.google.com/admin-sdk/directory/v1/reference/users#resource
 * If you get "ReferenceError: AdminDirectory is not defined" go to Resources > Advanced Google Services > enable: "Admin Directory"
 */
 
// Pulls User data from G Suite
function GSuite_users() {
  var pageToken;
  var page;
  
  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var GSuite_A = SpreadsheetApp.setActiveSheet(ss.getSheetByName('GSuite_A'));
  
  // Clear content except header all the way to "O" column. TODO: make it find cells with content and cleare those.
  GSuite_A.getRange('A2:Z').clearContent();
  
  // This decided where to post. Starts after header.
  var lastRow = Math.max(GSuite_A.getRange(2, 1).getLastRow(),1);
  var index = 0;
  
  // Run the reqeust
  do {
    page = AdminDirectory.Users.list({
    customer: 'my_customer',
    maxResults: 50,
    orderBy: 'email',
    pageToken: pageToken
  });

//************************
// Assemble User's data
  var params = JSON.stringify(page.users);
  var data = JSON.parse(params);
  
  // Populate sheet
    if (data) {
      for(var i = 0; i < data.length; i++ ){
        
        // Sheet var name, get last lost + previus content, columnt. Set value based on position in JSON
        GSuite_A.getRange(index + lastRow + i, 1).setValue(data[i].orgUnitPath);
        GSuite_A.getRange(index + lastRow + i, 2).setValue(data[i].name.fullName);
        GSuite_A.getRange(index + lastRow + i, 3).setValue(data[i].primaryEmail);
        
        // This data sit in an array in JSON, you have to specify all steps to get there. Put it in >> (things||"" << to post empty space if there is no data.
        var title = (data[i] && data[i].organizations && data[i].organizations[0] && data[i].organizations[0].title)||""; GSuite_A.getRange(index + lastRow + i, 4).setValue(title);
        var department = (data[i] && data[i].organizations && data[i].organizations[0] && data[i].organizations[0].department)||""; GSuite_A.getRange(index + lastRow + i, 5).setValue(department);
        var buildingId = (data[i] && data[i].locations && data[i].locations[0] && data[i].locations[0].buildingId)||""; GSuite_A.getRange(index + lastRow + i, 6).setValue(buildingId);
        var floorName = (data[i] && data[i].locations && data[i].locations[0] && data[i].locations[0].floorName)||""; GSuite_A.getRange(index + lastRow + i, 7).setValue(floorName);
        var phone = (data[i] && data[i].phones && data[i].phones[0] && data[i].phones[0].value)||""; GSuite_A.getRange(index + lastRow + i, 8).setValue(phone);
        var manager = (data[i] && data[i].relations && data[i].relations[0] && data[i].relations[0].value)||""; GSuite_A.getRange(index + lastRow + i, 9).setValue(manager);

        GSuite_A.getRange(index + lastRow + i, 10).setValue(data[i].lastLoginTime);
        GSuite_A.getRange(index + lastRow + i, 11).setValue(data[i].isAdmin);
        GSuite_A.getRange(index + lastRow + i, 12).setValue(data[i].isDelegatedAdmin);
        GSuite_A.getRange(index + lastRow + i, 13).setValue(data[i].isEnrolledIn2Sv);
        GSuite_A.getRange(index + lastRow + i, 14).setValue(data[i].isEnforcedIn2Sv);
        GSuite_A.getRange(index + lastRow + i, 15).setValue(data[i].aliases);
        
        
//        GSuite_A.getRange(index + lastRow + i, 20).setValue(data[i].etag);
//        GSuite_A.getRange(index + lastRow + i, 21).setValue(data[i].id);
        
        //debug >> Full answer
        //  GSuite_A.getRange(index + lastRow + i, 20).setValue(params);
      }
      index += 50;
    } else {
      Logger.log('No users found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  
// This actually posts data when it's ready.
  GSuite_A.sort(1);
SpreadsheetApp.flush();
}
