# 📋 How to Set Up Google Sheets for the PG Research Form

This guide walks you through activating your Google Sheet to receive live responses from both the **Tenant / Student** questionnaire and the **PG Owner / Manager** questionnaire.

---

## ⚡ Quick 5-Step Setup (Takes ~2 minutes)

### Step 1: Create a Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com).
2. Create a new blank spreadsheet.
3. Rename it at the top to: **`PG App UX Research Responses`**.

---

### Step 2: Open Apps Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. A new tab will open with a code editor showing a default `Code.gs` file.
3. Delete any default code inside `Code.gs` (`function myFunction() { ... }`).

---

### Step 3: Paste the Provided Script Code
1. Open [`google-apps-script/PG_Research_Form_Script.gs`](file:///d:/Portfolio_Navneet/google-apps-script/PG_Research_Form_Script.gs).
2. Copy all the contents of that file.
3. Paste it into the Google Apps Script editor.
4. Click the **Save** icon (Floppy disk icon) or press `Ctrl + S`.

---

### Step 4: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the **Select type** gear icon ⚙️ on the left, and choose **Web app**.
3. Fill in the fields:
   - **Description**: `PG Research Responses Web App`
   - **Execute as**: `Me (your email address)`
   - **Who has access**: **`Anyone`** ⚠️ *(Critical: Must be "Anyone" so that visitors on your portfolio can submit their responses without needing a Google login).*
4. Click **Deploy**.
5. When prompted with *Authorization Required*, click:
   - **Authorize Access**
   - Choose your Google account
   - Click **Advanced** (bottom left of modal)
   - Click **Go to Untitled project (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** that appears (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 5: Connect URL to Your Portfolio
1. Open [`src/app/utils/pgResearchSubmit.ts`](file:///d:/Portfolio_Navneet/src/app/utils/pgResearchSubmit.ts).
2. Paste your Web App URL into `GOOGLE_SCRIPT_URL`:

```ts
export const PG_RESEARCH_CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/YOUR_DEPLOYED_ID_HERE/exec",
};
```
3. Save the file!

---

## 🎯 How It Works

- When a **Tenant / Student** completes the form, the script automatically creates a tab named **`Tenant Responses`** styled in **Emerald Green**, with all 20 questions as column headers.
- When an **Owner / Manager** completes the form, the script automatically creates a tab named **`Owner Responses`** styled in **Amber**, with all 21 questions as column headers.
- **Fail-safe Guarantee**: Even before you paste the Google Script URL (or if the user is offline), the form automatically saves responses to the visitor's `localStorage` (`pg_case_study_research_submissions`), ensuring **zero data loss**.
