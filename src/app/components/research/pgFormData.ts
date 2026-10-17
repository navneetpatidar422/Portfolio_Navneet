export type QuestionType = "single" | "multi" | "scale" | "text";

export interface FormQuestion {
  id: string;
  number: number;
  question: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  hint?: string;
  hasOther?: boolean;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  placeholder?: string;
}

export interface FormSection {
  id: string;
  title: string;
  subtitle: string;
  questions: FormQuestion[];
}

export interface FormSchema {
  role: "tenant" | "owner";
  roleTitle: string;
  roleBadge: string;
  roleDescription: string;
  estimatedTime: string;
  sections: FormSection[];
}

// -------------------------------------------------------------
// Form 1: Student / Tenant Questionnaire (20 Questions, 4 Sections)
// -------------------------------------------------------------
export const TENANT_FORM_SCHEMA: FormSchema = {
  role: "tenant",
  roleTitle: "Tenant / Student Persona",
  roleBadge: "Living in a PG / Hostel",
  roleDescription: "Share your honest experiences living in a PG—from how you pay rent and report maintenance to sharing KYC documents.",
  estimatedTime: "~3 minutes",
  sections: [
    {
      id: "tenant-sec-1",
      title: "Section 1: About You",
      subtitle: "Basic demographics to help us map user demographics and life stage.",
      questions: [
        {
          id: "t_age_group",
          number: 1,
          question: "Age group",
          type: "single",
          required: true,
          options: ["18-20", "21-23", "24-27", "28+"],
        },
        {
          id: "t_status",
          number: 2,
          question: "Current status",
          type: "single",
          required: true,
          options: [
            "College student",
            "Exam preparation",
            "Working professional",
            "Other",
          ],
          hasOther: true,
        },
        {
          id: "t_duration",
          number: 3,
          question: "How long have you lived in a PG?",
          type: "single",
          required: true,
          options: ["Under 6 months", "6-12 months", "1-2 years", "2+ years"],
        },
        {
          id: "t_monthly_rent",
          number: 4,
          question: "Monthly rent",
          type: "single",
          required: true,
          options: ["Under ₹5k", "₹5-8k", "₹8-12k", "₹12k+"],
        },
      ],
    },
    {
      id: "tenant-sec-2",
      title: "Section 2: Paying Rent",
      subtitle: "Understanding payment channels, reminder fatigue, and late payment anxiety.",
      questions: [
        {
          id: "t_pay_method",
          number: 5,
          question: "How do you usually pay?",
          type: "single",
          required: true,
          options: [
            "Cash",
            "UPI to owner",
            "Bank transfer",
            "Through a PG app (RentOk, etc.)",
            "Other",
          ],
          hasOther: true,
        },
        {
          id: "t_due_reminder",
          number: 6,
          question: "How do you know rent is due?",
          type: "single",
          required: true,
          options: [
            "Owner reminds me",
            "I remember myself",
            "WhatsApp group message",
            "App notification (RentOk, etc.)",
            "No fixed reminder",
          ],
        },
        {
          id: "t_late_frequency",
          number: 7,
          question: "How often can't you pay on time?",
          type: "single",
          required: true,
          options: ["Often", "Sometimes", "Rarely", "Never"],
        },
        {
          id: "t_late_action",
          number: 8,
          question: "When you can't pay on time, what do you do?",
          type: "single",
          required: true,
          hint: "Helps uncover psychological friction during payment delays",
          options: [
            "Call or message the owner",
            "Tell in person",
            "Avoid the owner",
            "Just pay late without informing",
            "I always pay on time / Never delayed",
          ],
        },
        {
          id: "t_receipt_proof",
          number: 9,
          question: "Do you get a receipt or proof of payment?",
          type: "single",
          required: true,
          options: ["Always", "Sometimes", "Never"],
        },
      ],
    },
    {
      id: "tenant-sec-3",
      title: "Section 3: Complaints & Maintenance",
      subtitle: "Discovering how issues are reported, tracked, and resolved.",
      questions: [
        {
          id: "t_issues_faced",
          number: 10,
          question: "Issues you've faced",
          type: "multi",
          required: true,
          hint: "Select all that apply",
          options: [
            "Water",
            "Electricity",
            "Wi-Fi",
            "Cleaning",
            "Food",
            "Roommate issues",
            "Safety",
            "Other",
          ],
          hasOther: true,
        },
        {
          id: "t_report_method",
          number: 11,
          question: "How do you report a problem?",
          type: "single",
          required: true,
          options: [
            "Phone call",
            "WhatsApp",
            "In person",
            "Through caretaker",
            "I don't report",
          ],
        },
        {
          id: "t_complaint_updates",
          number: 12,
          question: "Do you get updates on your complaint?",
          type: "single",
          required: true,
          options: ["Always", "Sometimes", "Never"],
        },
        {
          id: "t_fix_satisfaction",
          number: 13,
          question: "Satisfaction with how fast issues get fixed",
          type: "scale",
          required: true,
          scaleMinLabel: "1 - Very Dissatisfied",
          scaleMaxLabel: "5 - Extremely Satisfied",
        },
      ],
    },
    {
      id: "tenant-sec-4",
      title: "Section 4: Documents & App Expectations",
      subtitle: "Security comfort, document onboarding, and desired digital features.",
      questions: [
        {
          id: "t_docs_submitted",
          number: 14,
          question: "Documents you submitted at move-in",
          type: "multi",
          required: true,
          hint: "Select all that apply",
          options: [
            "Aadhaar",
            "College ID",
            "Office ID",
            "Photo",
            "Parent contact",
            "Police verification",
          ],
        },
        {
          id: "t_doc_upload_comfort",
          number: 15,
          question: "Comfort uploading documents in an app",
          type: "single",
          required: true,
          options: ["Very comfortable", "Somewhat", "Not comfortable"],
        },
        {
          id: "t_doc_concern",
          number: 16,
          question: "Biggest concern about sharing documents",
          type: "single",
          required: true,
          options: ["Misuse", "Privacy", "No acknowledgement", "No concern"],
        },
        {
          id: "t_current_app_usage",
          number: 17,
          question: "Does your PG use an app for rent or complaints?",
          type: "single",
          required: true,
          options: [
            "Yes, RentOk",
            "Yes, Stanza Living",
            "Yes, Zolo",
            "Yes, another app",
            "No app, we do it manually",
            "Not sure",
          ],
        },
        {
          id: "t_features_wanted",
          number: 18,
          question: "Which features would you want in a PG app?",
          type: "multi",
          required: true,
          hint: "Select your top wishlist items",
          options: [
            "Rent reminders",
            "Online payment",
            "Extension request",
            "Complaint tracking",
            "Receipts",
            "Notices from owner",
          ],
        },
        {
          id: "t_biggest_frustration",
          number: 19,
          question: "Your biggest frustration living in a PG",
          type: "text",
          required: false,
          placeholder: "e.g., Unannounced room visits, Wi-Fi cutting out during exams, delayed repairs...",
        },
        {
          id: "t_contact_optin",
          number: 20,
          question: "Open to a 10-minute chat? Leave your phone number or email",
          type: "text",
          required: false,
          placeholder: "Optional: Your phone number, WhatsApp, or email address",
          hint: "Optional: We will only contact you for a brief UX chat about your PG experience.",
        },
      ],
    },
  ],
};

// -------------------------------------------------------------
// Form 2: PG Owner Questionnaire (21 Questions, 4 Sections)
// -------------------------------------------------------------
export const OWNER_FORM_SCHEMA: FormSchema = {
  role: "owner",
  roleTitle: "PG Owner / Manager Persona",
  roleBadge: "Managing / Operating PG",
  roleDescription: "Share your perspective on rent collection, tenant disputes, paperwork compliance, and digital app adoption.",
  estimatedTime: "~3 minutes",
  sections: [
    {
      id: "owner-sec-1",
      title: "Section 1: About You and Your PG",
      subtitle: "Basic operational profile of your accommodation property.",
      questions: [
        {
          id: "o_age_group",
          number: 1,
          question: "Age group",
          type: "single",
          required: true,
          options: ["Under 30", "30-45", "46-60", "60+"],
        },
        {
          id: "o_total_capacity",
          number: 2,
          question: "Total beds/rooms",
          type: "single",
          required: true,
          options: ["Under 10", "10-25", "25-50", "50+"],
        },
        {
          id: "o_years_operating",
          number: 3,
          question: "Years running the PG",
          type: "single",
          required: true,
          options: ["Under 1", "1-3", "3-5", "5+"],
        },
        {
          id: "o_live_at_property",
          number: 4,
          question: "Do you live at the property?",
          type: "single",
          required: true,
          options: [
            "Yes",
            "No, I have a caretaker",
            "No, I visit sometimes",
          ],
        },
      ],
    },
    {
      id: "owner-sec-2",
      title: "Section 2: Rent Tracking & Collection",
      subtitle: "How you track receivables, send reminders, and handle delays.",
      questions: [
        {
          id: "o_tracking_method",
          number: 5,
          question: "How do you track rent now?",
          type: "single",
          required: true,
          options: [
            "Paper register",
            "Excel or Google Sheets",
            "Memory",
            "An app (RentOk, TrackMyPG, etc.)",
            "Other",
          ],
          hasOther: true,
        },
        {
          id: "o_late_tenants_count",
          number: 6,
          question: "How many tenants pay late in a month?",
          type: "single",
          required: true,
          options: ["Almost none", "1-3", "4-8", "More than 8"],
        },
        {
          id: "o_collection_methods",
          number: 7,
          question: "How do you collect rent?",
          type: "multi",
          required: true,
          hint: "Select all that apply",
          options: ["Cash", "UPI", "Bank transfer", "Cheque"],
        },
        {
          id: "o_reminder_method",
          number: 8,
          question: "How do you remind tenants?",
          type: "single",
          required: true,
          options: [
            "Call",
            "WhatsApp",
            "In person",
            "App auto-reminder",
            "I don't remind",
          ],
        },
        {
          id: "o_extension_policy",
          number: 9,
          question: "When a tenant asks for more time, what do you do?",
          type: "single",
          required: true,
          options: [
            "Usually allow",
            "Decide case by case",
            "Strict, no extension",
          ],
        },
        {
          id: "o_time_spent_tracking",
          number: 10,
          question: "Time spent per month tracking and chasing rent",
          type: "single",
          required: true,
          options: ["Under 1 hr", "1-3 hrs", "3-6 hrs", "6+ hrs"],
        },
      ],
    },
    {
      id: "owner-sec-3",
      title: "Section 3: Onboarding & Complaints",
      subtitle: "Document verification overhead and handling maintenance requests.",
      questions: [
        {
          id: "o_docs_collected",
          number: 11,
          question: "Documents you collect",
          type: "multi",
          required: true,
          hint: "Select all that apply",
          options: [
            "Aadhaar",
            "College or Office ID",
            "Photo",
            "Parent contact",
            "Police verification",
          ],
        },
        {
          id: "o_doc_storage",
          number: 12,
          question: "How do you store them?",
          type: "single",
          required: true,
          options: [
            "Physical copies",
            "Photos on phone",
            "Cloud folder",
            "Not stored",
          ],
        },
        {
          id: "o_complaint_reception",
          number: 13,
          question: "How do you receive complaints?",
          type: "single",
          required: true,
          options: [
            "Calls",
            "WhatsApp",
            "In person",
            "Caretaker tells me",
          ],
        },
        {
          id: "o_biggest_complaint",
          number: 14,
          question: "Biggest complaint category",
          type: "single",
          required: true,
          options: [
            "Water",
            "Electricity",
            "Wi-Fi",
            "Cleaning",
            "Food",
            "Tenant disputes",
          ],
        },
      ],
    },
    {
      id: "owner-sec-4",
      title: "Section 4: Tech & Willingness to Pay",
      subtitle: "Comfort with software, prior app experiences, and pricing appetite.",
      questions: [
        {
          id: "o_smartphone_comfort",
          number: 15,
          question: "Comfort with smartphone apps",
          type: "single",
          required: true,
          options: ["Very comfortable", "Okay", "Need help"],
        },
        {
          id: "o_used_pg_app",
          number: 16,
          question: "Have you used a PG management app?",
          type: "single",
          required: true,
          options: ["Yes, still using", "Yes, stopped", "Never"],
        },
        {
          id: "o_which_apps_used",
          number: 17,
          question: "Which of these have you used?",
          type: "multi",
          required: true,
          hint: "Select all that apply",
          options: [
            "RentOk",
            "TrackMyPG",
            "QuickStay Smart",
            "Another app",
            "None of these",
          ],
        },
        {
          id: "o_why_stopped",
          number: 18,
          question: "If stopped or never, why?",
          type: "single",
          required: true,
          options: [
            "Too complicated",
            "Too costly",
            "Didn't know about it",
            "Not needed",
            "Still using an app / Never stopped",
          ],
        },
        {
          id: "o_monthly_willingness_pay",
          number: 19,
          question: "What would you pay per month for such an app?",
          type: "single",
          required: true,
          options: ["Free only", "Under ₹200", "₹200-500", "₹500+"],
        },
        {
          id: "o_biggest_headache",
          number: 20,
          question: "Your biggest headache as a PG owner",
          type: "text",
          required: false,
          placeholder: "e.g., Unpaid utility bills, sudden tenant vacating without notice, managing maintenance staff...",
        },
        {
          id: "o_contact_optin",
          number: 21,
          question: "Open to a 10-minute chat? Leave your phone number or email",
          type: "text",
          required: false,
          placeholder: "Optional: Your phone number or email address",
          hint: "Optional: Helps us conduct short follow-up interviews for realistic persona validation.",
        },
      ],
    },
  ],
};
