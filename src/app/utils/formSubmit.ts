// Config for backend integrations
export const BACKEND_CONFIG = {
  // Paste your Google Apps Script Web App URL here after deploying:
  // e.g. "https://script.google.com/macros/s/AKfycb.../exec"
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbw-Xaw2PgzJeuYn_q0-exUtiKM7sRh5NMXGZy9KFC6NyoNDOKpUydraELBWtoyX3XTe/exec" 
};

export interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  description: string;
}

export interface ReviewPayload {
  type: "review";
  projectId: string;
  name: string;
  email?: string;
  rating: number;
  text: string;
}

export const submitToBackend = async (payload: ContactPayload | ReviewPayload): Promise<boolean> => {
  // If no Google Script URL is provided, fall back to local storage immediately
  if (!BACKEND_CONFIG.GOOGLE_SCRIPT_URL) {
    console.warn("BACKEND_CONFIG.GOOGLE_SCRIPT_URL is not set. Saving to localStorage only.");
    return false;
  }

  try {
    const response = await fetch(BACKEND_CONFIG.GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Script redirect behavior
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        createdAt: new Date().toISOString()
      }),
    });
    
    return true;
  } catch (error) {
    console.error("Error submitting form to Google Apps Script:", error);
    return false;
  }
};
