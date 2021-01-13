//This project will require you to:
//1. make correctly named sheets for every function and configure headers.   TODO: fix initial sheet creation
//2. Correctly add all needed credentailas to project properties so they can be called from there. https://developers.google.com/apps-script/reference/properties
//3. You will probably want to create one more sheet that with do data comparison and highlight who has access to what. TODO: Generate audit sheet with code

//*******************************************************************************************************************************************
// Start of code
// Create basic interface for manuall trigering sync ( normally it's expected you will switch on daily sync )
// https://script.google.com/home/triggers
// Menu options
var ui = SpreadsheetApp.getUi();
function onOpen() {
  ui.createMenu("Sync")
  .addItem("PeopleHR", "PeopleHR")
  .addItem("GSuite", "GSuite_users")
  .addItem("Slack", "Slack_users")
  .addItem("Microsoft", "Microsoft_users")
  .addItem("Atlassian", "atlassian")
  .addItem("Kisi", "Kisi")
  .addToUi();
};

// Get all tokens and codes from project properties
var scriptProperties = PropertiesService.getScriptProperties()
    peopleHR_key = scriptProperties.getProperty("hr_token")
    querry_name = scriptProperties.getProperty("querry_name")
    slack_token = scriptProperties.getProperty("slack_token")            // this it a bot taken given when you install app, not secret that APP has.
    microsoft_token = scriptProperties.getProperty("microsoft_token")    // TODO: replace with service account
    atlassian_URL = scriptProperties.getProperty("atlassian_URL")        // "<your_domain>.atlassian.net"
    atlassian_token = scriptProperties.getProperty("atlassian_token")
    atlassian_user = scriptProperties.getProperty("atlassian_user")     // TODO: replace with service account
    kisi_cred = scriptProperties.getProperty("kisi_cred");
    kisi_secret = scriptProperties.getProperty("kisi_secret");
