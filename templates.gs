// This set of scripts is responsible for creating automated sheets / dashboards.


// Main dashboard
function make_dashboard() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.insertSheet().setName("Dashboard_A");
  var Dashboard_A = spreadsheet.getSheetByName("Dashboard_A");
  
  // Formating
  Dashboard_A.setFrozenRows(2) // header
  Dashboard_A.setFrozenColumns(0)
  Dashboard_A.getRange("1:2").activate();
  Dashboard_A.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
  Dashboard_A.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long
//  Dashboard_A.getRange("A:B").activate();
//  Dashboard_A.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
//  Dashboard_A.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long
  
  
  
  SpreadsheetApp.flush();
}
