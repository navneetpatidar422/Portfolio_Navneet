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
