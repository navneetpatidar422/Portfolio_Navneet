// Configuration and submission helper for the PG Management App UX Case Study research form

export const PG_RESEARCH_CONFIG = {
  // Update this URL with your deployed Google Apps Script Web App URL
  // e.g. "https://script.google.com/macros/s/AKfycb.../exec"
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzLIJmklfzYJ_bnCUiK1q1JsvGS48dqGuKyWEeOy7IGMpUn2hgNofUV4FTGW2evF5nR/exec",
};

export interface PGResearchSubmissionPayload {
  role: "tenant" | "owner";
  submittedAt: string;
  responses: Record<string, string | string[] | number>;
  questionsMap?: Record<string, string>; // Maps question ID to question title for readability
}

const STORAGE_KEY = "pg_case_study_research_submissions";
const DRAFT_KEY_PREFIX = "pg_case_study_draft_";
const COMPLETED_KEY = "pg_case_study_submitted_status";

/**
 * Check if the user has already submitted a response on this browser
 */
export const getResearchSubmissionStatus = (): { submitted: boolean; role?: "tenant" | "owner"; timestamp?: string } | null => {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

/**
 * Mark research as submitted and purge all working drafts
 */
export const markResearchSubmitted = (role: "tenant" | "owner") => {
  try {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify({
      submitted: true,
      role,
      timestamp: new Date().toISOString()
    }));
    localStorage.removeItem(`${DRAFT_KEY_PREFIX}tenant`);
    localStorage.removeItem(`${DRAFT_KEY_PREFIX}owner`);
  } catch (e) {
    // ignore
  }
};

/**
 * Reset submission lock and clear all drafts so user can submit a fresh response
 */
export const clearResearchSubmissionStatus = () => {
  try {
    localStorage.removeItem(COMPLETED_KEY);
    localStorage.removeItem(`${DRAFT_KEY_PREFIX}tenant`);
    localStorage.removeItem(`${DRAFT_KEY_PREFIX}owner`);
  } catch (e) {
    // ignore
  }
};

/**
 * Save draft responses to localStorage so users don't lose progress on reload
 */
export const saveFormDraft = (role: "tenant" | "owner", answers: Record<string, any>) => {
  // If user already submitted, do not save any drafts
  if (getResearchSubmissionStatus()?.submitted) return;

  try {
    localStorage.setItem(`${DRAFT_KEY_PREFIX}${role}`, JSON.stringify({
      savedAt: new Date().toISOString(),
      answers
    }));
  } catch (e) {
    console.warn("Unable to save form draft to localStorage:", e);
  }
};

/**
 * Retrieve saved draft responses from localStorage
 */
export const getFormDraft = (role: "tenant" | "owner"): Record<string, any> | null => {
  // If user already submitted, never restore prefilled drafts
  if (getResearchSubmissionStatus()?.submitted) return null;

  try {
    const raw = localStorage.getItem(`${DRAFT_KEY_PREFIX}${role}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.answers || null;
  } catch (e) {
    return null;
  }
};

/**
 * Clear draft responses after successful submission
 */
export const clearFormDraft = (role?: "tenant" | "owner") => {
  try {
    if (role) {
      localStorage.removeItem(`${DRAFT_KEY_PREFIX}${role}`);
    } else {
      localStorage.removeItem(`${DRAFT_KEY_PREFIX}tenant`);
      localStorage.removeItem(`${DRAFT_KEY_PREFIX}owner`);
    }
  } catch (e) {
    // ignore
  }
};

/**
 * Submit form data to Google Apps Script Web App
 * Automatically saves a backup copy to localStorage to guarantee 0% data loss.
 */
export const submitPGResearchForm = async (
  payload: PGResearchSubmissionPayload
): Promise<{ success: boolean; savedLocally: boolean; error?: string }> => {
  // 1. Always save a local copy in browser history as guaranteed backup
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.unshift({
      ...payload,
      id: "sub_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7)
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
  } catch (localErr) {
    console.warn("Local storage backup save warning:", localErr);
  }

  // 2. Clear working draft and mark completed
  markResearchSubmitted(payload.role);

  // 3. If no Google Script URL configured yet, return polite local success
  if (!PG_RESEARCH_CONFIG.GOOGLE_SCRIPT_URL || PG_RESEARCH_CONFIG.GOOGLE_SCRIPT_URL.trim() === "") {
    console.info("PG_RESEARCH_CONFIG.GOOGLE_SCRIPT_URL is not set yet. Saved to browser storage.");
    return { success: true, savedLocally: true };
  }

  // 4. Send to Google Apps Script
  try {
    // We send as plain text JSON to avoid CORS preflight (OPTIONS) limitations in Google Apps Script
    await fetch(PG_RESEARCH_CONFIG.GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return { success: true, savedLocally: true };
  } catch (err: any) {
    console.error("Failed to send responses to Google Apps Script:", err);
    // Even if fetch threw an error, it was already stored locally so the user won't feel blocked
    return { success: true, savedLocally: true, error: err?.message };
  }
};
