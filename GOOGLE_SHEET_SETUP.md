# Google Sheets Integration Guide for Gosu x SPEFL Registrations

This document explains how to connect the registration form to a live Google Sheet.

---

## 1. Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name it **"Gosu x SPEFL Registrations"**.
3. In the first row (Row 1), add the following column headers:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| **Timestamp** | **Full Name** | **Phone** | **Email** | **Course Track** | **City** | **State** | **Source** |

---

## 2. Add the Google Apps Script Webhook

1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Delete any code in the editor and paste the following script:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;

    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var fullName = data.fullName || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var courseTrack = data.trackName || data.courseTrack || "";
    var city = data.city || "";
    var state = data.state || "";
    var source = data.source || "Website Form";

    sheet.appendRow([
      timestamp,
      fullName,
      phone,
      email,
      courseTrack,
      city,
      state,
      source
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Registration recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click **Save** (💾 icon).

---

## 3. Deploy as a Web App

1. In the Apps Script editor, click the blue **Deploy** button (top right) → **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Gosu Registration Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial so the website can submit leads without authentication)*
4. Click **Deploy**.
5. Copy the **Web App URL** (e.g., `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## 4. Configure in the Website

Add the URL to your `.env` or `.env.local` file:

```env
# Google Sheet Webhook URL
VITE_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

> **Automatic Fallback:** Even without the Google Sheet URL configured, all registrations are automatically saved locally in [`data/registrations.json`](file:///c:/Users/tando/OneDrive/Desktop/Work/Gosu/Gosu%20Website/gosu-india-web-main/data/registrations.json) so no leads are ever lost!
