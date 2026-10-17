export type Language = "en" | "hi" | "hinglish";

export interface QuestionTranslation {
  question: string;
  hint?: string;
  placeholder?: string;
  options?: string[];
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

export interface SectionTranslation {
  title: string;
  subtitle: string;
  questions: Record<string, QuestionTranslation>;
}

export interface SchemaTranslation {
  roleTitle: string;
  roleBadge: string;
  sections: Record<string, SectionTranslation>;
}

// -------------------------------------------------------------
// OWNER FORM TRANSLATIONS (English, Hindi, Hinglish)
// -------------------------------------------------------------
export const OWNER_TRANSLATIONS: Record<Language, SchemaTranslation> = {
  en: {
    roleTitle: "PG Owner / Manager Persona",
    roleBadge: "Managing / Operating PG",
    sections: {
      "owner-sec-1": {
        title: "Section 1: About You and Your PG",
        subtitle: "Basic operational profile of your accommodation property.",
        questions: {
          o_age_group: {
            question: "Age group",
            options: ["Under 30", "30-45", "46-60", "60+"],
          },
          o_total_capacity: {
            question: "Total beds/rooms",
            options: ["Under 10", "10-25", "25-50", "50+"],
          },
          o_years_operating: {
            question: "Years running the PG",
            options: ["Under 1", "1-3", "3-5", "5+"],
          },
          o_live_at_property: {
            question: "Do you live at the property?",
            options: [
              "Yes",
              "No, I have a caretaker",
              "No, I visit sometimes",
            ],
          },
        },
      },
      "owner-sec-2": {
        title: "Section 2: Rent Tracking & Collection",
        subtitle: "How you track receivables, send reminders, and handle delays.",
        questions: {
          o_tracking_method: {
            question: "How do you track rent now?",
            options: [
              "Paper register",
              "Excel or Google Sheets",
              "Memory",
              "An app (RentOk, TrackMyPG, etc.)",
              "Other",
            ],
          },
          o_late_tenants_count: {
            question: "How many tenants pay late in a month?",
            options: ["Almost none", "1-3", "4-8", "More than 8"],
          },
          o_collection_methods: {
            question: "How do you collect rent?",
            options: ["Cash", "UPI", "Bank transfer", "Cheque"],
          },
          o_reminder_method: {
            question: "How do you remind tenants?",
            options: [
              "Call",
              "WhatsApp",
              "In person",
              "App auto-reminder",
              "I don't remind",
            ],
          },
          o_extension_policy: {
            question: "When a tenant asks for more time, what do you do?",
            options: [
              "Usually allow",
              "Decide case by case",
              "Strict, no extension",
            ],
          },
          o_time_spent_tracking: {
            question: "Time spent per month tracking and chasing rent",
            options: ["Under 1 hr", "1-3 hrs", "3-6 hrs", "6+ hrs"],
          },
        },
      },
      "owner-sec-3": {
        title: "Section 3: Onboarding & Complaints",
        subtitle: "Document verification overhead and handling maintenance requests.",
        questions: {
          o_docs_collected: {
            question: "Documents you collect",
            options: [
              "Aadhaar",
              "College or Office ID",
              "Photo",
              "Parent contact",
              "Police verification",
            ],
          },
          o_doc_storage: {
            question: "How do you store them?",
            options: [
              "Physical copies",
              "Photos on phone",
              "Cloud folder",
              "Not stored",
            ],
          },
          o_complaint_reception: {
            question: "How do you receive complaints?",
            options: [
              "Calls",
              "WhatsApp",
              "In person",
              "Caretaker tells me",
            ],
          },
          o_biggest_complaint: {
            question: "Biggest complaint category",
            options: [
              "Water",
              "Electricity",
              "Wi-Fi",
              "Cleaning",
              "Food",
              "Tenant disputes",
            ],
          },
        },
      },
      "owner-sec-4": {
        title: "Section 4: Tech & Willingness to Pay",
        subtitle: "Comfort with software, prior app experiences, and pricing appetite.",
        questions: {
          o_smartphone_comfort: {
            question: "Comfort with smartphone apps",
            options: ["Very comfortable", "Okay", "Need help"],
          },
          o_used_pg_app: {
            question: "Have you used a PG management app?",
            options: ["Yes, still using", "Yes, stopped", "Never"],
          },
          o_which_apps_used: {
            question: "Which of these have you used?",
            options: [
              "RentOk",
              "TrackMyPG",
              "QuickStay Smart",
              "Another app",
              "None of these",
            ],
          },
          o_why_stopped: {
            question: "If stopped or never, why?",
            options: [
              "Too complicated",
              "Too costly",
              "Didn't know about it",
              "Not needed",
              "Still using an app / Never stopped",
            ],
          },
          o_monthly_willingness_pay: {
            question: "What would you pay per month for such an app?",
            options: ["Free only", "Under ₹200", "₹200-500", "₹500+"],
          },
          o_biggest_headache: {
            question: "Your biggest headache as a PG owner",
            placeholder: "e.g., Unpaid utility bills, sudden tenant vacating without notice, managing maintenance staff...",
          },
          o_contact_optin: {
            question: "Open to a 10-minute chat? Leave your phone number or email",
            placeholder: "Optional: Your phone number or email address",
            hint: "Optional: Helps us conduct short follow-up interviews for realistic persona validation.",
          },
        },
      },
    },
  },

  hi: {
    roleTitle: "पीजी ओनर / मैनेजर प्रश्नावली",
    roleBadge: "पीजी संचालन एवं प्रबंधन",
    sections: {
      "owner-sec-1": {
        title: "भाग 1: आपके और आपके पीजी के बारे में",
        subtitle: "आपकी संपत्ति और संचालन से जुड़ी सामान्य जानकारी।",
        questions: {
          o_age_group: {
            question: "आपकी उम्र का वर्ग (Age group)",
            options: ["30 से कम", "30-45 वर्ष", "46-60 वर्ष", "60 से अधिक"],
          },
          o_total_capacity: {
            question: "कुल बेड्स या कमरों की संख्या",
            options: ["10 से कम", "10-25", "25-50", "50 से अधिक"],
          },
          o_years_operating: {
            question: "आप कितने सालों से यह पीजी चला रहे हैं?",
            options: ["1 साल से कम", "1-3 साल", "3-5 साल", "5 साल से अधिक"],
          },
          o_live_at_property: {
            question: "क्या आप उसी प्रॉपर्टी में रहते हैं?",
            options: [
              "हाँ, मैं वहीं रहता हूँ",
              "नहीं, वहाँ केयरटेकर रहता है",
              "नहीं, बस कभी-कभार देखने जाता हूँ",
            ],
          },
        },
      },
      "owner-sec-2": {
        title: "भाग 2: किराया (Rent) का हिसाब और वसूली",
        subtitle: "किराया ट्रैक करने, याद दिलाने और लेट पेमेंट संभालने का तरीका।",
        questions: {
          o_tracking_method: {
            question: "अभी आप किराये का हिसाब कैसे रखते हैं?",
            options: [
              "कागज़ी डायरी या रजिस्टर",
              "एक्सेल या गूगल शीट्स",
              "याददाश्त से (मुँहज़बानी)",
              "कोई ऐप (जैसे RentOk, TrackMyPG आदि)",
              "अन्य (Other)",
            ],
          },
          o_late_tenants_count: {
            question: "महीने में लगभग कितने किरायेदार लेट पेमेंट करते हैं?",
            options: ["शायद ही कोई", "1 से 3 किरायेदार", "4 से 8 किरायेदार", "8 से अधिक"],
          },
          o_collection_methods: {
            question: "आप किराया किस माध्यम से लेते हैं?",
            options: ["कैश (नकद)", "UPI (गूगल पे/फोनपे/पेटीएम)", "बैंक ट्रांसफर", "चेक"],
          },
          o_reminder_method: {
            question: "किरायेदारों को किराया याद कैसे दिलाते हैं?",
            options: [
              "फ़ोन कॉल करके",
              "व्हाट्सएप पर मैसेज भेजकर",
              "मिलने पर आमने-सामने बोलकर",
              "ऐप से ऑटो-रिमाइंडर भेजकर",
              "याद नहीं दिलाते, वे खुद देते हैं",
            ],
          },
          o_extension_policy: {
            question: "जब कोई किरायेदार कुछ दिन की मोहलत मांगता है, तो आप क्या करते हैं?",
            options: [
              "आमतौर पर समय दे देते हैं",
              "परिस्थिति देखकर फ़ैसला लेते हैं",
              "सख़्त नियम, कोई अतिरिक्त समय नहीं",
            ],
          },
          o_time_spent_tracking: {
            question: "किराये का हिसाब रखने और वसूली में महीने का कितना समय लगता है?",
            options: ["1 घंटे से कम", "1 से 3 घंटे", "3 से 6 घंटे", "6 घंटे से अधिक"],
          },
        },
      },
      "owner-sec-3": {
        title: "भाग 3: दस्तावेज़ (Onboarding) और शिकायतें",
        subtitle: "आईडी वेरिफिकेशन का झंझट और मेंटेनेंस शिकायतों का समाधान।",
        questions: {
          o_docs_collected: {
            question: "किरायेदार रखते समय आप कौन-से दस्तावेज़ लेते हैं?",
            options: [
              "आधार कार्ड",
              "कॉलेज या ऑफ़िस आईडी",
              "पासपोर्ट साइज़ फ़ोटो",
              "माता-पिता (पैरेंट्स) का संपर्क नंबर",
              "पुलिस वेरिफिकेशन फ़ॉर्म",
            ],
          },
          o_doc_storage: {
            question: "इन दस्तावेज़ों को आप कैसे संभाल कर रखते हैं?",
            options: [
              "फ़ाइल में फ़ोटोकॉपी (Physical)",
              "फ़ोन में फ़ोटो खींचकर",
              "गूगल ड्राइव या कंप्यूटर फ़ोल्डर में",
              "संभाल कर नहीं रखते",
            ],
          },
          o_complaint_reception: {
            question: "किरायेदार अपनी शिकायतें आपको कैसे बताते हैं?",
            options: [
              "कॉल करके",
              "व्हाट्सएप पर",
              "मिलकर आमने-सामने",
              "केयरटेकर के ज़रिये पता चलता है",
            ],
          },
          o_biggest_complaint: {
            question: "सबसे ज़्यादा शिकायत किस बात की आती है?",
            options: [
              "पानी की समस्या",
              "बिजली की समस्या",
              "वाई-फ़ाई (इंटरनेट)",
              "साफ़-सफ़ाई",
              "खाना (Food)",
              "किरायेदारों का आपसी झगड़ा",
            ],
          },
        },
      },
      "owner-sec-4": {
        title: "भाग 4: टेक्नोलॉजी और ऐप उपयोग की इच्छा",
        subtitle: "स्मार्टफ़ोन ऐप्स से सहजता और सॉफ्टवेयर के लिए भुगतान की सोच।",
        questions: {
          o_smartphone_comfort: {
            question: "स्मार्टफ़ोन ऐप्स चलाने में आप कितने सहज हैं?",
            options: [
              "बहुत आसानी से चला लेते हैं",
              "ठीक-ठाक चला लेते हैं",
              "किसी की मदद लेनी पड़ती है",
            ],
          },
          o_used_pg_app: {
            question: "क्या आपने कभी कोई पीजी मैनेजमेंट ऐप इस्तेमाल किया है?",
            options: [
              "हाँ, अभी भी इस्तेमाल कर रहे हैं",
              "हाँ, पहले किया था पर अब बंद कर दिया",
              "कभी इस्तेमाल नहीं किया",
            ],
          },
          o_which_apps_used: {
            question: "इनमें से कौन-सा ऐप इस्तेमाल किया है?",
            options: [
              "RentOk",
              "TrackMyPG",
              "QuickStay Smart",
              "कोई अन्य ऐप",
              "इनमें से कोई नहीं",
            ],
          },
          o_why_stopped: {
            question: "अगर ऐप छोड़ दिया या कभी इस्तेमाल नहीं किया, तो क्यों?",
            options: [
              "समझने में बहुत मुश्किल था",
              "बहुत महंगा था",
              "इसके बारे में जानकारी नहीं थी",
              "इसकी कोई ज़रूरत नहीं लगी",
              "अभी भी ऐप का उपयोग कर रहे हैं / कभी बंद नहीं किया",
            ],
          },
          o_monthly_willingness_pay: {
            question: "ऐसे उपयोगी ऐप के लिए आप महीने का कितना खर्च कर सकते हैं?",
            options: ["सिर्फ़ मुफ़्त (Free only)", "₹200 से कम", "₹200 से ₹500 तक", "₹500 से अधिक"],
          },
          o_biggest_headache: {
            question: "पीजी चलाने में आपकी सबसे बड़ी सिरदर्दी या परेशानी क्या है?",
            placeholder: "जैसे: बिना बताए कमरा खाली करना, बिजली बिल का झंझट, नौकरों/केयरटेकर की मनमानी...",
          },
          o_contact_optin: {
            question: "क्या आप 10 मिनट बातचीत के लिए तैयार हैं? अपना नंबर या ईमेल छोड़ें",
            placeholder: "वैकल्पिक: अपना मोबाइल नंबर या ईमेल आईडी लिखें",
            hint: "वैकल्पिक: सिर्फ़ पीजी मैनेजमेंट रिसर्च के लिए संपर्क किया जाएगा।",
          },
        },
      },
    },
  },

  hinglish: {
    roleTitle: "PG Owner / Manager Questionnaire",
    roleBadge: "PG Management & Operations",
    sections: {
      "owner-sec-1": {
        title: "Part 1: Aapke aur PG ke Baare Mein",
        subtitle: "Aapke PG property aur daily operations ki basic details.",
        questions: {
          o_age_group: {
            question: "Aapka age group kya hai?",
            options: ["30 se kam", "30-45 saal", "46-60 saal", "60 se zyada"],
          },
          o_total_capacity: {
            question: "Total beds ya rooms kitne hain?",
            options: ["10 se kam", "10-25", "25-50", "50 se zyada"],
          },
          o_years_operating: {
            question: "Kitne saalon se PG chala rahe hain?",
            options: ["1 saal se kam", "1-3 saal", "3-5 saal", "5+ saal"],
          },
          o_live_at_property: {
            question: "Kya aap usi property me rehte hain?",
            options: [
              "Haan, mai wahi rehta hu",
              "Nahi, caretaker rehta hai",
              "Nahi, kabhi-kabhi visit karta hu",
            ],
          },
        },
      },
      "owner-sec-2": {
        title: "Part 2: Rent Tracking aur Collection",
        subtitle: "Rent ka hisaab rakhna, reminder bhejna aur delays handle karna.",
        questions: {
          o_tracking_method: {
            question: "Abhi rent ka hisaab-kitaab kaise maintain karte hain?",
            options: [
              "Paper register ya diary me",
              "Excel ya Google Sheets par",
              "Yaad se (manual)",
              "Koi app use karte hain (RentOk, TrackMyPG etc.)",
              "Other (kuch aur)",
            ],
          },
          o_late_tenants_count: {
            question: "Har mahine lagbhag kitne tenants rent late dete hain?",
            options: ["Shayad hi koi", "1-3 tenants", "4-8 tenants", "8 se zyada"],
          },
          o_collection_methods: {
            question: "Rent kis mode se collect karte hain?",
            options: ["Cash (nakad)", "UPI (GPay / PhonePe / Paytm)", "Bank transfer", "Cheque"],
          },
          o_reminder_method: {
            question: "Tenants ko rent ka reminder kaise dete hain?",
            options: [
              "Direct call karke",
              "WhatsApp message bhejkar",
              "In person (milkar bolte hain)",
              "App auto-reminder ke zariye",
              "Remind nahi karte, wo khud de dete hain",
            ],
          },
          o_extension_policy: {
            question: "Jab koi tenant extra time maangta hai rent ke liye, tab aap kya karte hain?",
            options: [
              "Aamtaur par allow kar dete hain",
              "Case dekh kar decide karte hain",
              "Strict rehte hain, koi extension nahi",
            ],
          },
          o_time_spent_tracking: {
            question: "Rent hisaab aur chasing me har mahine lagbhag kitna time lagta hai?",
            options: ["1 ghante se kam", "1-3 ghante", "3-6 ghante", "6+ ghante"],
          },
        },
      },
      "owner-sec-3": {
        title: "Part 3: Onboarding aur Complaints",
        subtitle: "ID documents verification aur maintenance issues handle karna.",
        questions: {
          o_docs_collected: {
            question: "Move-in ke time tenants se kaunse documents lete hain?",
            options: [
              "Aadhaar card",
              "College ya Office ID",
              "Passport size photo",
              "Parents ka contact number",
              "Police verification form",
            ],
          },
          o_doc_storage: {
            question: "In documents ko kaise store karke rakhte hain?",
            options: [
              "Physical photocopies (file me)",
              "Phone me photos lekar",
              "Google Drive ya cloud me",
              "Store nahi karte",
            ],
          },
          o_complaint_reception: {
            question: "Tenants apni complaints kaise batate hain?",
            options: [
              "Direct call karke",
              "WhatsApp par",
              "In person (milkar)",
              "Caretaker batata hai",
            ],
          },
          o_biggest_complaint: {
            question: "Sabse zyada complaints kis cheez ki aati hain?",
            options: [
              "Paani (Water)",
              "Bijli (Electricity)",
              "Wi-Fi / Internet",
              "Cleaning / Safai",
              "Khaana (Food)",
              "Tenants ke aapsi disputes",
            ],
          },
        },
      },
      "owner-sec-4": {
        title: "Part 4: Tech & Willingness to Pay",
        subtitle: "Smartphone apps me comfort aur paid software lene ka mindset.",
        questions: {
          o_smartphone_comfort: {
            question: "Smartphone apps use karne me aap kitne comfortable hain?",
            options: [
              "Bohat comfortably chala lete hain",
              "Theek-thaak chala lete hain",
              "Kisi ki help leni padti hai",
            ],
          },
          o_used_pg_app: {
            question: "Kya aapne pehle koi PG management app use kiya hai?",
            options: [
              "Haan, abhi bhi use kar rahe hain",
              "Haan, pehle use kiya tha par fir chhod diya",
              "Kabhi use nahi kiya",
            ],
          },
          o_which_apps_used: {
            question: "Inme se kaunsa app use kiya hai?",
            options: [
              "RentOk",
              "TrackMyPG",
              "QuickStay Smart",
              "Koi doosra app",
              "Inme se koi nahi",
            ],
          },
          o_why_stopped: {
            question: "Agar use karna chhod diya ya kabhi nahi kiya, toh kyu?",
            options: [
              "Samajhna bohat complex tha",
              "Bohat mehenga (costly) tha",
              "Iske baare me pata nahi tha",
              "Zaroorat hi feel nahi hui",
              "Abhi bhi app use kar rahe hain / Kabhi band nahi kiya",
            ],
          },
          o_monthly_willingness_pay: {
            question: "Aise helpful app ke liye aap har mahine kitna pay karne ko ready hain?",
            options: ["Sirf Free app chalega", "₹200 se kam", "₹200 se ₹500 tak", "₹500+"],
          },
          o_biggest_headache: {
            question: "PG chalane me aapka sabse bada headache ya problem kya hai?",
            placeholder: "Jaise: bina bataye kamra khali karna, bijli bill ka jhanjhat, staff manage karna...",
          },
          o_contact_optin: {
            question: "Kya aap 10 minute call pe baat karne ke liye open hain? Apna number ya email likhein",
            placeholder: "Optional: Apna phone number ya email ID",
            hint: "Optional: Sirf short UX research follow-up ke liye use hoga.",
          },
        },
      },
    },
  },
};

// -------------------------------------------------------------
// TENANT FORM TRANSLATIONS (English, Hindi, Hinglish)
// -------------------------------------------------------------
export const TENANT_TRANSLATIONS: Record<Language, SchemaTranslation> = {
  en: {
    roleTitle: "Tenant / Student Persona",
    roleBadge: "Living in a PG / Hostel",
    sections: {
      "tenant-sec-1": {
        title: "Section 1: About You",
        subtitle: "Basic demographics to help us map user demographics and life stage.",
        questions: {
          t_age_group: {
            question: "Age group",
            options: ["18-20", "21-23", "24-27", "28+"],
          },
          t_status: {
            question: "Current status",
            options: ["College student", "Exam preparation", "Working professional", "Other"],
          },
          t_duration: {
            question: "How long have you lived in a PG?",
            options: ["Under 6 months", "6-12 months", "1-2 years", "2+ years"],
          },
          t_monthly_rent: {
            question: "Monthly rent",
            options: ["Under ₹5k", "₹5-8k", "₹8-12k", "₹12k+"],
          },
        },
      },
      "tenant-sec-2": {
        title: "Section 2: Paying Rent",
        subtitle: "Understanding payment channels, reminder fatigue, and late payment anxiety.",
        questions: {
          t_pay_method: {
            question: "How do you usually pay?",
            options: ["Cash", "UPI to owner", "Bank transfer", "Through a PG app (RentOk, etc.)", "Other"],
          },
          t_due_reminder: {
            question: "How do you know rent is due?",
            options: ["Owner reminds me", "I remember myself", "WhatsApp group message", "App notification (RentOk, etc.)", "No fixed reminder"],
          },
          t_late_frequency: {
            question: "How often can't you pay on time?",
            options: ["Often", "Sometimes", "Rarely", "Never"],
          },
          t_late_action: {
            question: "When you can't pay on time, what do you do?",
            hint: "Helps uncover psychological friction during payment delays",
            options: [
              "Call or message the owner",
              "Tell in person",
              "Avoid the owner",
              "Just pay late without informing",
              "I always pay on time / Never delayed",
            ],
          },
          t_receipt_proof: {
            question: "Do you get a receipt or proof of payment?",
            options: ["Always", "Sometimes", "Never"],
          },
        },
      },
      "tenant-sec-3": {
        title: "Section 3: Complaints & Maintenance",
        subtitle: "Discovering how issues are reported, tracked, and resolved.",
        questions: {
          t_issues_faced: {
            question: "Issues you've faced",
            hint: "Select all that apply",
            options: ["Water", "Electricity", "Wi-Fi", "Cleaning", "Food", "Roommate issues", "Safety", "Other"],
          },
          t_report_method: {
            question: "How do you report a problem?",
            options: ["Phone call", "WhatsApp", "In person", "Through caretaker", "I don't report"],
          },
          t_complaint_updates: {
            question: "Do you get updates on your complaint?",
            options: ["Always", "Sometimes", "Never"],
          },
          t_fix_satisfaction: {
            question: "Satisfaction with how fast issues get fixed",
            scaleMinLabel: "1 - Very Dissatisfied",
            scaleMaxLabel: "5 - Extremely Satisfied",
          },
        },
      },
      "tenant-sec-4": {
        title: "Section 4: Documents & App Expectations",
        subtitle: "Security comfort, document onboarding, and desired digital features.",
        questions: {
          t_docs_submitted: {
            question: "Documents you submitted at move-in",
            hint: "Select all that apply",
            options: ["Aadhaar", "College ID", "Office ID", "Photo", "Parent contact", "Police verification"],
          },
          t_doc_upload_comfort: {
            question: "Comfort uploading documents in an app",
            options: ["Very comfortable", "Somewhat", "Not comfortable"],
          },
          t_doc_concern: {
            question: "Biggest concern about sharing documents",
            options: ["Misuse", "Privacy", "No acknowledgement", "No concern"],
          },
          t_current_app_usage: {
            question: "Does your PG use an app for rent or complaints?",
            options: ["Yes, RentOk", "Yes, Stanza Living", "Yes, Zolo", "Yes, another app", "No app, we do it manually", "Not sure"],
          },
          t_features_wanted: {
            question: "Which features would you want in a PG app?",
            hint: "Select your top wishlist items",
            options: ["Rent reminders", "Online payment", "Extension request", "Complaint tracking", "Receipts", "Notices from owner"],
          },
          t_biggest_frustration: {
            question: "Your biggest frustration living in a PG",
            placeholder: "e.g., Unannounced room visits, Wi-Fi cutting out during exams, delayed repairs...",
          },
          t_contact_optin: {
            question: "Open to a 10-minute chat? Leave your phone number or email",
            placeholder: "Optional: Your phone number, WhatsApp, or email address",
            hint: "Optional: We will only contact you for a brief UX chat about your PG experience.",
          },
        },
      },
    },
  },
  hi: {
    roleTitle: "किरायेदार / छात्र पर्सोना",
    roleBadge: "PG / हॉस्टल में निवासी",
    sections: {
      "tenant-sec-1": {
        title: "भाग 1: आपके बारे में",
        subtitle: "बुनियादी जानकारी ताकि हम उपयोगकर्ताओं की जनसांख्यिकी को समझ सकें।",
        questions: {
          t_age_group: {
            question: "आपकी आयु सीमा",
            options: ["18-20", "21-23", "24-27", "28 से अधिक"],
          },
          t_status: {
            question: "वर्तमान स्थिति",
            options: ["कॉलेज छात्र", "प्रतियोगी परीक्षा की तैयारी", "नौकरीपेशा (Working)", "अन्य"],
          },
          t_duration: {
            question: "आप कितने समय से PG में रह रहे हैं?",
            options: ["6 महीने से कम", "6-12 महीने", "1-2 साल", "2 साल से अधिक"],
          },
          t_monthly_rent: {
            question: "मासिक किराया",
            options: ["₹5,000 से कम", "₹5,000 - ₹8,000", "₹8,000 - ₹12,000", "₹12,000 से अधिक"],
          },
        },
      },
      "tenant-sec-2": {
        title: "भाग 2: किराया भुगतान",
        subtitle: "भुगतान का माध्यम, रिमाइंडर और देरी से भुगतान संबंधी अनुभव।",
        questions: {
          t_pay_method: {
            question: "आप आमतौर पर किराया कैसे देते हैं?",
            options: ["नकद (Cash)", "मालिक को UPI", "बैंक ट्रांसफर (NEFT/IMPS)", "PG ऐप के ज़रिए (RentOk आदि)", "अन्य"],
          },
          t_due_reminder: {
            question: "आपको किराया देने की तारीख कैसे पता चलती है?",
            options: ["मालिक याद दिलाते हैं", "मुझे खुद याद रहता है", "व्हाट्सएप ग्रुप मैसेज से", "ऐप नोटिफिकेशन (RentOk आदि)", "कोई तय रिमाइंडर नहीं"],
          },
          t_late_frequency: {
            question: "कितनी बार ऐसा होता है कि आप समय पर किराया नहीं दे पाते?",
            options: ["अक्सर (Often)", "कभी-कभी (Sometimes)", "बहुत कम (Rarely)", "कभी नहीं (Never)"],
          },
          t_late_action: {
            question: "जब समय पर किराया नहीं दे पाते, तब आप क्या करते हैं?",
            hint: "इससे भुगतान में देरी के मानसिक तनाव को समझने में मदद मिलती है",
            options: [
              "मालिक को कॉल या मैसेज करते हैं",
              "सामने मिलकर बताते हैं",
              "मालिक से मिलने से बचते हैं",
              "बिना बताए बस देर से दे देते हैं",
              "हमेशा समय पर भुगतान करता हूँ / कभी देरी नहीं होती",
            ],
          },
          t_receipt_proof: {
            question: "क्या आपको किराये की रसीद या प्रूफ मिलता है?",
            options: ["हमेशा (Always)", "कभी-कभी (Sometimes)", "कभी नहीं (Never)"],
          },
        },
      },
      "tenant-sec-3": {
        title: "भाग 3: शिकायतें एवं मेंटेनेंस",
        subtitle: "PG में आने वाली समस्याओं की रिपोर्टिंग और उनके समाधान की प्रक्रिया।",
        questions: {
          t_issues_faced: {
            question: "आपने किन समस्याओं का सामना किया है?",
            hint: "लागू होने वाले सभी विकल्प चुनें",
            options: ["पानी की समस्या", "बिजली / पंखा / लाइट", "वाई-फाई (Wi-Fi)", "सफाई (Cleaning)", "खाना (Food)", "रूममेट संबंधी समस्या", "सुरक्षा (Safety)", "अन्य"],
          },
          t_report_method: {
            question: "आप समस्या की शिकायत कैसे दर्ज करते हैं?",
            options: ["फ़ोन कॉल करके", "व्हाट्सएप पर लिखकर", "मालिक से सीधे मिलकर", "केयरटेकर के ज़रिए", "शिकायत नहीं करता"],
          },
          t_complaint_updates: {
            question: "क्या आपको शिकायत की प्रगति (Status Update) मिलती है?",
            options: ["हमेशा (Always)", "कभी-कभी (Sometimes)", "कभी नहीं (Never)"],
          },
          t_fix_satisfaction: {
            question: "समस्याएं कितनी जल्दी ठीक होती हैं, इससे आप कितने संतुष्ट हैं?",
            scaleMinLabel: "1 - बहुत असंतुष्ट",
            scaleMaxLabel: "5 - बेहद संतुष्ट",
          },
        },
      },
      "tenant-sec-4": {
        title: "भाग 4: दस्तावेज़ एवं ऐप से अपेक्षाएं",
        subtitle: "दस्तावेज़ों की सुरक्षा और डिजिटल PG ऐप में आपकी पसंदीदा सुविधाएं।",
        questions: {
          t_docs_submitted: {
            question: "PG में शिफ्ट होते समय आपने कौन-से दस्तावेज़ जमा किए?",
            hint: "लागू होने वाले सभी विकल्प चुनें",
            options: ["आधार कार्ड", "कॉलेज आईडी", "ऑफिस आईडी", "पासपोर्ट फोटो", "माता-पिता का संपर्क", "पुलिस वेरिफिकेशन"],
          },
          t_doc_upload_comfort: {
            question: "ऐप में सरकारी दस्तावेज़ अपलोड करने में आप कितने सहज हैं?",
            options: ["पूरी तरह सहज", "थोड़ा बहुत", "सहज नहीं"],
          },
          t_doc_concern: {
            question: "दस्तावेज़ शेयर करने में सबसे बड़ी चिंता क्या रहती है?",
            options: ["दुरुपयोग (Misuse)", "निजता (Privacy)", "कोई रसीद या पुष्टि न मिलना", "कोई चिंता नहीं"],
          },
          t_current_app_usage: {
            question: "क्या आपका PG किराये या शिकायत के लिए कोई ऐप इस्तेमाल करता है?",
            options: ["हाँ, RentOk", "हाँ, Stanza Living", "हाँ, Zolo", "हाँ, कोई दूसरा ऐप", "कोई ऐप नहीं, सब मैन्युअल होता है", "पता नहीं"],
          },
          t_features_wanted: {
            question: "PG ऐप में आप कौन-से फीचर्स सबसे ज़्यादा चाहते हैं?",
            hint: "अपनी पसंदीदा सुविधाएं चुनें",
            options: ["किराया रिमाइंडर", "ऑनलाइन पेमेंट", "तारीख आगे बढ़ाने की रिक्वेस्ट", "शिकायत ट्रैकिंग", "डिजिटल रसीद", "मालिक के नोटिस / सूचनाएं"],
          },
          t_biggest_frustration: {
            question: "PG में रहने के दौरान आपकी सबसे बड़ी परेशानी या फ्रस्ट्रेशन क्या है?",
            placeholder: "जैसे: बिना बताए रूम में आ जाना, परीक्षा के समय Wi-Fi बंद होना, देरी से मरम्मत...",
          },
          t_contact_optin: {
            question: "क्या आप 10 मिनट की बातचीत के लिए तैयार हैं? अपना नंबर या ईमेल दर्ज करें",
            placeholder: "वैकल्पिक: फ़ोन नंबर, व्हाट्सएप या ईमेल आईडी",
            hint: "वैकल्पिक: केवल PG अनुभव पर संक्षिप्त UX बातचीत के लिए संपर्क किया जाएगा।",
          },
        },
      },
    },
  },
  hinglish: {
    roleTitle: "Tenant / Student Persona",
    roleBadge: "PG / Hostel Resident",
    sections: {
      "tenant-sec-1": {
        title: "Section 1: Aapke Baare Mein",
        subtitle: "Basic profile taaki hum user demographics aur life stage samajh sakein.",
        questions: {
          t_age_group: {
            question: "Age group",
            options: ["18-20", "21-23", "24-27", "28+"],
          },
          t_status: {
            question: "Current status",
            options: ["College student", "Exam preparation", "Working professional", "Other"],
          },
          t_duration: {
            question: "Aap PG mein kitne time se reh rahe hain?",
            options: ["6 months se kam", "6-12 months", "1-2 saal", "2 saal se zyada"],
          },
          t_monthly_rent: {
            question: "Monthly rent kitna hai?",
            options: ["₹5k se kam", "₹5-8k", "₹8-12k", "₹12k+"],
          },
        },
      },
      "tenant-sec-2": {
        title: "Section 2: Rent Payment",
        subtitle: "Payment modes, reminder fatigue aur payment delay ke experience.",
        questions: {
          t_pay_method: {
            question: "Aap rent usually kaise pay karte hain?",
            options: ["Cash", "Owner ko UPI", "Bank transfer", "PG app se (RentOk etc.)", "Other"],
          },
          t_due_reminder: {
            question: "Aapko rent due date kaise pata chalti hai?",
            options: ["Owner remind karte hain", "Mujhe khud yaad rehta hai", "WhatsApp group message", "App notification (RentOk etc.)", "Koi fixed reminder nahi"],
          },
          t_late_frequency: {
            question: "Aisa kitni baar hota hai jab rent time par pay nahi ho pata?",
            options: ["Often (Aksar)", "Sometimes (Kabhi-kabhi)", "Rarely (Bohat kam)", "Never (Kabhi nahi)"],
          },
          t_late_action: {
            question: "Jab time par rent nahi de paate, tab aap kya karte hain?",
            hint: "Payment delays ke time aane wali hesitation samajhne ke liye",
            options: [
              "Owner ko call ya message karte hain",
              "Milkar direct batate hain",
              "Owner se bachne ki koshish karte hain",
              "Bina bataye delay se pay karte hain",
              "Hamesha time par pay karta hoon / Kabhi delay nahi hota",
            ],
          },
          t_receipt_proof: {
            question: "Kya payment karne par aapko receipt ya proof milta hai?",
            options: ["Always (Hamesha)", "Sometimes (Kabhi-kabhi)", "Never (Kabhi nahi)"],
          },
        },
      },
      "tenant-sec-3": {
        title: "Section 3: Complaints & Maintenance",
        subtitle: "PG complaints ki reporting aur unka resolution process.",
        questions: {
          t_issues_faced: {
            question: "Aapne kaun-kaun se issues face kiye hain?",
            hint: "Jo bhi apply ho, sab select karein",
            options: ["Water issue", "Electricity / Light / Fan", "Wi-Fi issue", "Cleaning / Sweeping", "Food / Mess", "Roommate issue", "Safety concern", "Other"],
          },
          t_report_method: {
            question: "Problem aane par complain kaise karte hain?",
            options: ["Phone call karke", "WhatsApp pe likhkar", "Direct milkar", "Caretaker ke through", "Complain nahi karta"],
          },
          t_complaint_updates: {
            question: "Kya aapko complaint ka status update milta hai?",
            options: ["Always (Hamesha)", "Sometimes (Kabhi-kabhi)", "Never (Kabhi nahi)"],
          },
          t_fix_satisfaction: {
            question: "Problem kitni jaldi solve hoti hai, isse kitne satisfied hain?",
            scaleMinLabel: "1 - Bohat Dissatisfied",
            scaleMaxLabel: "5 - Kaafi Satisfied",
          },
        },
      },
      "tenant-sec-4": {
        title: "Section 4: Documents & App Expectations",
        subtitle: "Document privacy aur digital PG app mein aapke wishlist features.",
        questions: {
          t_docs_submitted: {
            question: "Move-in ke time kaunse documents submit kiye the?",
            hint: "Jo bhi apply ho, select karein",
            options: ["Aadhaar card", "College ID", "Office ID", "Passport photo", "Parents ka contact", "Police verification"],
          },
          t_doc_upload_comfort: {
            question: "App mein documents upload karne mein kitne comfortable hain?",
            options: ["Fully comfortable", "Thoda bahut", "Comfortable nahi"],
          },
          t_doc_concern: {
            question: "Documents share karte waqt sabse bada dar kya rehta hai?",
            options: ["Misuse ka dar", "Privacy leak", "Proof ya acknowledgement na milna", "Koi tension nahi"],
          },
          t_current_app_usage: {
            question: "Kya aapka PG rent ya complaints ke liye koi app use karta hai?",
            options: ["Haan, RentOk", "Haan, Stanza Living", "Haan, Zolo", "Haan, koi doosra app", "Koi app nahi, sab manual hota hai", "Pata nahi"],
          },
          t_features_wanted: {
            question: "PG app mein kaunse features aap sabse zyada chahenge?",
            hint: "Apne top wishlist features chunein",
            options: ["Rent reminders", "Online payment", "Date extension request", "Complaint tracking", "Payment receipts", "Owner ke important notices"],
          },
          t_biggest_frustration: {
            question: "PG life mein aapka sabse bada frustration ya problem kya hai?",
            placeholder: "Jaise: bina bataye room aana, exams ke time Wi-Fi cut hona, repair mein delay...",
          },
          t_contact_optin: {
            question: "Kya aap 10 minute feedback chat ke liye open hain? Apna number ya email likhein",
            placeholder: "Optional: Phone number, WhatsApp ya email ID",
            hint: "Optional: Sirf brief UX discussion ke liye use kiya jayega.",
          },
        },
      },
    },
  },
};

// -------------------------------------------------------------
// INTRO SCREEN TRANSLATIONS
// -------------------------------------------------------------
export const INTRO_TRANSLATIONS: Record<Language, {
  surveyBadge: string;
  heading: string;
  subheading: string;
  whatToExpect: string;
  timeTitle: string;
  timeSub: string;
  honestTitle: string;
  honestSub: string;
  anonTitle: string;
  anonSub: string;
  rolePrompt: string;
  tenantTitle: string;
  tenantSub: string;
  ownerTitle: string;
  ownerSub: string;
  startTenantBtn: string;
  startOwnerBtn: string;
  selectRolePrompt: string;
}> = {
  en: {
    surveyBadge: "User Research Survey",
    heading: "Hey there! Help me build a better PG Management App UX Case Study.",
    subheading: "Hi, I’m Navneet, a UI/UX designer building a UX case study for a simpler PG management app for owners and tenants. Existing apps like RentOk do a lot, but I believe the everyday experience can be much easier. Your 3-minute response will help me improve real frustrations like rent tracking, maintenance delays and document safety.",
    whatToExpect: "What to expect",
    timeTitle: "Takes ~3 minutes",
    timeSub: "4 short, simple sections",
    honestTitle: "No right or wrong",
    honestSub: "Just your honest story",
    anonTitle: "100% Anonymous",
    anonSub: "No spam, strictly research",
    rolePrompt: "Please select which describes you best:",
    tenantTitle: "I am a Tenant / PG Resident",
    tenantSub: "Currently staying or stayed in a PG, hostel, or shared accommodation.",
    ownerTitle: "I am a PG Owner / Manager",
    ownerSub: "Managing or running PG properties, rooms, or hostel accommodation.",
    startTenantBtn: "Start Tenant Questionnaire →",
    startOwnerBtn: "Start Owner Questionnaire →",
    selectRolePrompt: "Select an option above to continue",
  },
  hi: {
    surveyBadge: "यूज़र रिसर्च सर्वे",
    heading: "नमस्ते! एक बेहतर PG मैनेजमेंट ऐप बनाने में मेरी मदद करें।",
    subheading: "नमस्ते, मैं नवनीत हूँ, एक UI/UX डिज़ाइनर। मैं ओनर्स और किरायेदारों दोनों के लिए एक आसान और बेहतर PG मैनेजमेंट ऐप का केस स्टडी तैयार कर रहा हूँ। रेंटओके जैसे मौजूदा ऐप्स कई काम करते हैं, लेकिन रोज़मर्रा के अनुभव को और भी सरल बनाया जा सकता है। आपकी 3 मिनट की प्रतिक्रिया किराया ट्रैकिंग, मेंटेनेंस की समस्याओं और दस्तावेज़ों की सुरक्षा जैसे वास्तविक मुद्दों को सुलझाने में मदद करेगी।",
    whatToExpect: "सर्वे से क्या उम्मीद रखें",
    timeTitle: "लगभग 3 मिनट का समय",
    timeSub: "4 छोटे और सरल भाग",
    honestTitle: "कोई सही या गलत नहीं",
    honestSub: "बस आपका वास्तविक अनुभव",
    anonTitle: "100% गोपनीय व सुरक्षित",
    anonSub: "कोई स्पैम नहीं, केवल शोध हेतु",
    rolePrompt: "कृपया चुनें कि आपके लिए सबसे सही क्या है:",
    tenantTitle: "मैं एक किरायेदार / PG निवासी हूँ",
    tenantSub: "वर्तमान में या पहले किसी PG, हॉस्टल या शेयर्ड रूम में रहे हैं।",
    ownerTitle: "मैं PG का मालिक / प्रबंधक हूँ",
    ownerSub: "PG प्रॉपर्टी, कमरे या हॉस्टल का संचालन या प्रबंधन करते हैं।",
    startTenantBtn: "किरायेदार प्रश्नावली शुरू करें →",
    startOwnerBtn: "ओनर प्रश्नावली शुरू करें →",
    selectRolePrompt: "आगे बढ़ने के लिए ऊपर से एक विकल्प चुनें",
  },
  hinglish: {
    surveyBadge: "User Research Survey",
    heading: "Hey there! Ek behtar PG Management App banane mein meri help karein.",
    subheading: "Hi, main Navneet hoon, ek UI/UX designer. Main owners aur tenants dono ke liye ek simplified PG management app ka case study design kar raha hoon. RentOk jaise existing apps kafi kuch karte hain, par everyday experience ko aur aasan banaya ja sakta hai. Aapka 3-minute ka response rent tracking, maintenance delay aur document safety jaise real issues ko solve karne mein help karega.",
    whatToExpect: "Survey se kya expect karein",
    timeTitle: "Takes ~3 minutes",
    timeSub: "4 short, simple parts",
    honestTitle: "No right or wrong",
    honestSub: "Sirf aapka honest experience",
    anonTitle: "100% Anonymous",
    anonSub: "No spam, strictly research",
    rolePrompt: "Please select karein jo aapko best describe kare:",
    tenantTitle: "Main Tenant / PG Resident hoon",
    tenantSub: "Currently PG, hostel ya shared room mein rehte hain ya rahe hain.",
    ownerTitle: "Main PG Owner / Manager hoon",
    ownerSub: "PG properties, rooms ya hostel run ya manage karte hain.",
    startTenantBtn: "Tenant Questionnaire Shuru Karein →",
    startOwnerBtn: "Owner Questionnaire Shuru Karein →",
    selectRolePrompt: "Aage badhne ke liye upar ek option select karein",
  },
};
