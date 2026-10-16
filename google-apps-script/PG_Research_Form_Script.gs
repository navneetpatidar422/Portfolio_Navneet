/**
 * =========================================================================
 * PG MANAGEMENT APP - UX RESEARCH QUESTIONNAIRE GOOGLE APPS SCRIPT
 * Author: Navneet Patidar (@Navneet Designer)
 * Project: Two-Sided PG Management UX Case Study
 * =========================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (create a new blank spreadsheet, e.g. "PG App UX Research Responses").
 * 2. In Google Sheets, click: Extensions > Apps Script.
 * 3. Delete any default code in Code.gs, and paste this entire code into it.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. Click "Deploy" (top right blue button) > "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. In the configuration dialog:
 *    - Description: "PG Research Responses API"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (CRITICAL: must be Anyone so responses from portfolio visitors are saved)
 * 8. Click "Deploy". Authorize permissions when prompted by Google.
 * 9. Copy the generated "Web app URL" (looks like https://script.google.com/macros/s/AKfycb.../exec).
 * 10. Open your portfolio code file `src/app/utils/pgResearchSubmit.ts` and paste the URL into `GOOGLE_SCRIPT_URL`.
 * 
 * DONE! All submissions will automatically populate into two organized tabs:
 * - "Tenant Responses"
 * - "Owner Responses"
 */

// Define Question Headers for Form 1 (Tenant / Student)
var TENANT_HEADERS = [
  "Timestamp",
  "Q1: Age group",
  "Q2: Current status",
  "Q3: Living duration in PG",
  "Q4: Monthly rent",
  "Q5: Usual payment method",
  "Q6: How rent is reminded",
  "Q7: Late payment frequency",
  "Q8: Action when late",
  "Q9: Receipt/proof received",
  "Q10: Issues faced",
  "Q11: Problem reporting method",
  "Q12: Complaint updates received",
  "Q13: Fix satisfaction (1-5)",
  "Q14: Documents submitted",
  "Q15: App doc upload comfort",
  "Q16: Doc sharing concerns",
  "Q17: Current PG app in use",
  "Q18: Desired PG app features",
  "Q19: Biggest PG frustration",
  "Q20: Contact Info (Chat opt-in)"
];

var TENANT_KEYS = [
  "t_age_group",
  "t_status",
  "t_duration",
  "t_monthly_rent",
  "t_pay_method",
  "t_due_reminder",
  "t_late_frequency",
  "t_late_action",
  "t_receipt_proof",
  "t_issues_faced",
  "t_report_method",
  "t_complaint_updates",
  "t_fix_satisfaction",
  "t_docs_submitted",
  "t_doc_upload_comfort",
  "t_doc_concern",
  "t_current_app_usage",
  "t_features_wanted",
  "t_biggest_frustration",
  "t_contact_optin"
];

// Define Question Headers for Form 2 (PG Owner / Manager)
var OWNER_HEADERS = [
  "Timestamp",
  "Q1: Age group",
  "Q2: Total beds/rooms",
  "Q3: Years running PG",
  "Q4: Live at property",
  "Q5: Current rent tracking method",
  "Q6: Late paying tenants count",
  "Q7: Rent collection methods",
  "Q8: Rent reminder method",
  "Q9: Extension request policy",
  "Q10: Monthly hours spent tracking rent",
  "Q11: Documents collected",
  "Q12: Document storage method",
  "Q13: Complaint receiving channels",
  "Q14: Biggest complaint category",
  "Q15: Smartphone app comfort",
  "Q16: Used PG app before",
  "Q17: Apps used",
  "Q18: Reason stopped / never used",
  "Q19: Willingness to pay per month",
  "Q20: Biggest headache as PG owner",
  "Q21: Contact Info (Chat opt-in)"
];

var OWNER_KEYS = [
  "o_age_group",
  "o_total_capacity",
  "o_years_operating",
  "o_live_at_property",
  "o_tracking_method",
  "o_late_tenants_count",
  "o_collection_methods",
  "o_reminder_method",
  "o_extension_policy",
  "o_time_spent_tracking",
  "o_docs_collected",
  "o_doc_storage",
  "o_complaint_reception",
  "o_biggest_complaint",
  "o_smartphone_comfort",
  "o_used_pg_app",
  "o_which_apps_used",
  "o_why_stopped",
  "o_monthly_willingness_pay",
  "o_biggest_headache",
  "o_contact_optin"
];

/**
 * Handle HTTP GET Requests (Used for sanity test when opening the script URL in a browser)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      message: "PG Research Form API is active and ready to receive submissions.",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle HTTP POST Requests (Called by portfolio research form)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests
  try {
    lock.waitLock(30000);
  } catch (lockError) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: "Server busy, lock timeout" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var rawContents = e.postData.contents;
    var payload = JSON.parse(rawContents);

    var role = payload.role; // "tenant" or "owner"
    var responses = payload.responses || {};
    var submittedAt = payload.submittedAt || new Date().toISOString();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = role === "owner" ? "Owner Responses" : "Tenant Responses";
    var sheet = ss.getSheetByName(sheetName);

    var headers = role === "owner" ? OWNER_HEADERS : TENANT_HEADERS;
    var keys = role === "owner" ? OWNER_KEYS : TENANT_KEYS;

    // Create and format sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      setupSheetHeaders(sheet, headers, role);
    } else if (sheet.getLastRow() === 0) {
      setupSheetHeaders(sheet, headers, role);
    }

    // Build the row array
    var newRow = [new Date()]; // Col 1: Spreadsheet timestamp

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = responses[key];

      if (val === undefined || val === null) {
        newRow.push("");
      } else if (Array.isArray(val)) {
        newRow.push(val.join(", "));
      } else {
        newRow.push(val.toString());
      }
    }

    // Append row
    sheet.appendRow(newRow);

    // Auto-fit date column
    sheet.autoResizeColumn(1);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", role: role, row: sheet.getLastRow() })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Helper to setup sheet headers with beautiful styling
 */
function setupSheetHeaders(sheet, headers, role) {
  sheet.appendRow(headers);
  sheet.setFrozenRows(1);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Plus Jakarta Sans");
  headerRange.setFontSize(10);
  headerRange.setWrap(true);

  // Emerald theme for Tenant, Amber theme for Owner
  if (role === "owner") {
    headerRange.setBackground("#D97706"); // Amber-600
    headerRange.setFontColor("#FFFFFF");
  } else {
    headerRange.setBackground("#059669"); // Emerald-600
    headerRange.setFontColor("#FFFFFF");
  }

  // Set decent row height for header
  sheet.setRowHeight(1, 40);

  // Resize columns sensibly
  for (var c = 1; c <= headers.length; c++) {
    sheet.setColumnWidth(c, c === 1 ? 160 : 200);
  }
}
