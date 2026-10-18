import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Home,
  User,
  Building,
  Globe,
  Languages,
  RotateCcw,
  ChevronDown,
  X,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import {
  TENANT_FORM_SCHEMA,
  OWNER_FORM_SCHEMA,
  FormSchema,
  FormQuestion,
  FormSection,
} from "./pgFormData";
import {
  Language,
  OWNER_TRANSLATIONS,
  TENANT_TRANSLATIONS,
  INTRO_TRANSLATIONS,
  EXIT_MODAL_TRANSLATIONS,
} from "./pgTranslations";
import {
  submitPGResearchForm,
  clearFormDraft,
  clearResearchSubmissionStatus,
} from "../../utils/pgResearchSubmit";

export const PGResearchForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Robust origin detection: query param -> sessionStorage -> document.referrer -> default 'portfolio'
  const [source, setSource] = useState<"bio" | "portfolio">(() => {
    if (typeof window !== "undefined") {
      const fromParam = new URLSearchParams(window.location.search).get("from");
      if (fromParam === "bio" || fromParam === "links") {
        try { sessionStorage.setItem("pg_research_source", "bio"); } catch { }
        return "bio";
      }
      if (fromParam === "portfolio" || fromParam === "home" || fromParam === "work") {
        try { sessionStorage.setItem("pg_research_source", "portfolio"); } catch { }
        return "portfolio";
      }
      try {
        const stored = sessionStorage.getItem("pg_research_source");
        if (stored === "bio" || stored === "portfolio") return stored;
      } catch { }
      if (document.referrer.includes("/links") || document.referrer.includes("/links")) {
        try { sessionStorage.setItem("pg_research_source", "bio"); } catch { }
        return "bio";
      }
    }
    return "portfolio";
  });

  const isFromBio = source === "bio";

  // Selected role: null (intro screen) | 'tenant' | 'owner'
  const [selectedRole, setSelectedRole] = useState<"tenant" | "owner" | null>(null);

  // Started state: false = intro/role selection, true = answering questions
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Current step in the quiz flow (0 = Section 1 Splash, 1 = Q1, etc.)
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Highest step index reached in current session (tracks if user reached Q1+)
  const [maxStepReached, setMaxStepReached] = useState<number>(0);

  // Exit confirmation modal visibility
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  // Ref to primary continue button in modal for auto-focus
  const continueBtnRef = useRef<HTMLButtonElement | null>(null);

  // Update maxStepReached whenever stepIndex advances
  useEffect(() => {
    if (stepIndex > maxStepReached) {
      setMaxStepReached(stepIndex);
    }
  }, [stepIndex, maxStepReached]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isExitModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExitModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExitModalOpen]);

  // Lock body scroll when modal is open to prevent background jank
  useEffect(() => {
    if (isExitModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isExitModalOpen]);

  // Auto-focus the safe "Continue Answering" button when modal opens
  useEffect(() => {
    if (isExitModalOpen) {
      const timer = setTimeout(() => {
        continueBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isExitModalOpen]);

  // Slide transition direction: 1 = forward, -1 = backward
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Transition locking flag to prevent double-click skips
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Safety fallback for transition lock in case of background tab or reduced motion
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // High performance spring physics variants for buttery smooth slider feel
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "35%" : "-35%",
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 32, mass: 0.6 },
        opacity: { duration: 0.22, ease: "easeOut" },
        scale: { duration: 0.22, ease: "easeOut" },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-35%" : "35%",
      opacity: 0,
      scale: 0.985,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 32, mass: 0.6 },
        opacity: { duration: 0.16, ease: "easeIn" },
        scale: { duration: 0.16, ease: "easeIn" },
      },
    }),
  };

  // Validation error on current question (if required and uncompleted)
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form responses: question ID -> answer
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Custom text for "Other" option
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Submitted state (only true immediately after submitting in active session)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Language for owner questionnaire (en = English, hi = Hindi, hinglish = Hinglish)
  const [language, setLanguage] = useState<Language>("en");

  // Translator dropdown popover state
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active schema
  const schema: FormSchema | null =
    selectedRole === "tenant"
      ? TENANT_FORM_SCHEMA
      : selectedRole === "owner"
        ? OWNER_FORM_SCHEMA
        : null;

  const totalSections = schema ? schema.sections.length : 0;
  const totalQuestions = schema
    ? schema.sections.reduce((acc, sec) => acc + sec.questions.length, 0)
    : 0;

  // Answered questions count for gamified progress calculation & exit confirmation checks
  const answeredCount = schema
    ? schema.sections.reduce((acc, sec) => {
      return (
        acc +
        sec.questions.filter((q) => {
          const val = answers[q.id];
          return val !== undefined && val !== "" && (!Array.isArray(val) || val.length > 0);
        }).length
      );
    }, 0)
    : 0;

  const progressPercent = hasStarted && totalQuestions > 0
    ? Math.min(100, Math.round((answeredCount / totalQuestions) * 100))
    : 0;

  // Build linear quiz steps: [Section 1 Intro, Q1, Q2, ..., Section 2 Intro, Q6, ...]
  const quizSteps = useMemo(() => {
    if (!schema) return [];
    const steps: Array<{
      type: "section-splash" | "question";
      sectionIndex: number;
      section: FormSection;
      questionIndex?: number;
      question?: FormQuestion;
      globalQuestionNumber?: number;
      totalQuestions: number;
    }> = [];

    let globalQNum = 1;
    const totalQCount = schema.sections.reduce((acc, sec) => acc + sec.questions.length, 0);

    schema.sections.forEach((sec, sIdx) => {
      // 1. Section Splash Step
      steps.push({
        type: "section-splash",
        sectionIndex: sIdx,
        section: sec,
        totalQuestions: totalQCount,
      });

      // 2. Questions in this section
      sec.questions.forEach((q, qIdx) => {
        steps.push({
          type: "question",
          sectionIndex: sIdx,
          section: sec,
          questionIndex: qIdx,
          question: q,
          globalQuestionNumber: globalQNum++,
          totalQuestions: totalQCount,
        });
      });
    });

    return steps;
  }, [schema]);

  const currentStep = quizSteps[stepIndex] || null;
  const isLastStep = stepIndex >= quizSteps.length - 1;

  // Localized section details (Tenant & Owner)
  const getLocalizedSection = (sec: FormSection) => {
    const translations =
      selectedRole === "owner"
        ? OWNER_TRANSLATIONS[language]
        : selectedRole === "tenant"
          ? TENANT_TRANSLATIONS[language]
          : null;

    if (translations) {
      const tSec = translations.sections[sec.id];
      if (tSec) {
        return {
          title: tSec.title || sec.title,
          subtitle: tSec.subtitle || sec.subtitle,
        };
      }
    }
    return {
      title: sec.title,
      subtitle: sec.subtitle,
    };
  };

  // Localized question details (Tenant & Owner)
  const getLocalizedQ = (sec: FormSection, q: FormQuestion) => {
    const translations =
      selectedRole === "owner"
        ? OWNER_TRANSLATIONS[language]
        : selectedRole === "tenant"
          ? TENANT_TRANSLATIONS[language]
          : null;

    if (translations) {
      const tSec = translations.sections[sec.id];
      if (tSec && tSec.questions[q.id]) {
        const trans = tSec.questions[q.id];
        return {
          question: trans.question || q.question,
          hint: trans.hint !== undefined ? trans.hint : q.hint,
          placeholder: trans.placeholder || q.placeholder,
          options: trans.options || q.options,
          scaleMinLabel: trans.scaleMinLabel || q.scaleMinLabel,
          scaleMaxLabel: trans.scaleMaxLabel || q.scaleMaxLabel,
        };
      }
    }
    return {
      question: q.question,
      hint: q.hint,
      placeholder: q.placeholder,
      options: q.options,
      scaleMinLabel: q.scaleMinLabel,
      scaleMaxLabel: q.scaleMaxLabel,
    };
  };

  // Close translator dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen]);

  // Lifecycle effect: thoroughly wipe any drafts or submission locks on mount, unmount, or page exit
  useEffect(() => {
    clearFormDraft();
    clearResearchSubmissionStatus();

    const handleBeforeUnload = () => {
      clearFormDraft();
      clearResearchSubmissionStatus();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clear when leaving the survey page
      clearFormDraft();
      clearResearchSubmissionStatus();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Role selection helper with clean fresh start (no stale prefilled drafts)
  const handleSelectRole = (role: "tenant" | "owner") => {
    setSelectedRole(role);
    setValidationError(null);
    setStepIndex(0);
    setMaxStepReached(0);
    setIsExitModalOpen(false);
    setAnswers({});
    setOtherValues({});
  };

  // Non-janky scroll to top
  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.scrollY > 80) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset form completely for a fresh new submission (no prefilled answers)
  const handleResetForNewSubmission = () => {
    clearResearchSubmissionStatus();
    clearFormDraft();
    setAnswers({});
    setOtherValues({});
    setValidationError(null);
    setStepIndex(0);
    setMaxStepReached(0);
    setHasStarted(false);
    setSelectedRole(null);
    setIsSubmitted(false);
    setIsLangMenuOpen(false);
    setIsTransitioning(false);
    setIsExitModalOpen(false);
    scrollToTop();
    toast.success("Ready for a new submission! Form has been cleared.", { duration: 2500 });
  };

  // User confirms exit in modal: wipes in-progress responses and returns to intro
  const handleConfirmExit = () => {
    setIsExitModalOpen(false);
    clearFormDraft();
    setAnswers({});
    setOtherValues({});
    setValidationError(null);
    setStepIndex(0);
    setMaxStepReached(0);
    setHasStarted(false);
    setSelectedRole(null);
    scrollToTop();
    const tExit = EXIT_MODAL_TRANSLATIONS[language] || EXIT_MODAL_TRANSLATIONS.en;
    toast.info(tExit.toastExit, { duration: 3000 });
  };

  // User cancels exit / chooses to continue questionnaire
  const handleCancelExit = () => {
    setIsExitModalOpen(false);
  };

  // Helper to find the parent section for any question ID in current schema
  const getSectionForQuestion = (questionId: string): FormSection | undefined => {
    return schema?.sections.find((s) => s.questions.some((q) => q.id === questionId));
  };

  // Helper to get options list for a specific language
  const getOptionsForLang = (secId: string, q: FormQuestion, targetLang: Language): string[] => {
    const translations =
      selectedRole === "owner"
        ? OWNER_TRANSLATIONS[targetLang]
        : selectedRole === "tenant"
          ? TENANT_TRANSLATIONS[targetLang]
          : null;
    const tSec = translations?.sections[secId];
    const tQ = tSec?.questions[q.id];
    return tQ?.options || q.options || [];
  };

  // Helper to resolve an option's 0-based index across languages or schema
  const getOptionIndex = (secId: string, q: FormQuestion, val: string): number => {
    if (!val) return -1;
    if (q.options) {
      const idx = q.options.indexOf(val);
      if (idx !== -1) return idx;
    }
    const allLangs: Language[] = ["en", "hi", "hinglish"];
    for (const l of allLangs) {
      const opts = getOptionsForLang(secId, q, l);
      const idx = opts.indexOf(val);
      if (idx !== -1) return idx;
    }
    return -1;
  };

  // Helper to determine if an answer corresponds to the "Other" option in this question
  const isOtherSelected = (secId: string, q: FormQuestion, answerVal: any): boolean => {
    if (!q.hasOther) return false;
    const otherIdx = q.options ? q.options.length - 1 : -1;
    if (otherIdx === -1) return false;

    if (typeof answerVal === "string") {
      if (answerVal === "Other") return true;
      return getOptionIndex(secId, q, answerVal) === otherIdx;
    }
    if (Array.isArray(answerVal)) {
      return answerVal.some(
        (item) => item === "Other" || getOptionIndex(secId, q, item) === otherIdx
      );
    }
    return false;
  };

  // Robust check if an option is selected for single-select
  const isOptionSelected = (
    secId: string,
    q: FormQuestion,
    currentAnswer: any,
    optIdx: number,
    optText: string
  ): boolean => {
    if (currentAnswer === undefined || currentAnswer === null || currentAnswer === "") return false;
    if (currentAnswer === optText) return true;
    const savedIdx = getOptionIndex(secId, q, currentAnswer);
    return savedIdx === optIdx;
  };

  // Robust check if an option is checked for multi-select
  const isOptionChecked = (
    secId: string,
    q: FormQuestion,
    currentAnswer: any,
    optIdx: number,
    optText: string
  ): boolean => {
    if (!Array.isArray(currentAnswer)) return false;
    if (currentAnswer.includes(optText)) return true;
    return currentAnswer.some((item) => getOptionIndex(secId, q, item) === optIdx);
  };

  const handleSingleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setValidationError(null);
  };

  const handleMultiToggle = (secId: string, q: FormQuestion, option: string, optIdx: number) => {
    setAnswers((prev) => {
      const currentList: string[] = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      const existingIndexInList = currentList.findIndex(
        (item) => item === option || getOptionIndex(secId, q, item) === optIdx
      );
      let updated: string[];
      if (existingIndexInList !== -1) {
        updated = currentList.filter((_, idx) => idx !== existingIndexInList);
      } else {
        updated = [...currentList, option];
      }
      return { ...prev, [q.id]: updated };
    });
    setValidationError(null);
  };

  const handleScaleSelect = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationError(null);
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (value.trim()) {
      setValidationError(null);
    }
  };

  const handleOtherTextChange = (questionId: string, value: string) => {
    setOtherValues((prev) => ({ ...prev, [questionId]: value }));
    if (value.trim()) {
      setValidationError(null);
    }
  };

  // Language switch handler that strictly preserves and translates all previous answers!
  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language) {
      setIsLangMenuOpen(false);
      return;
    }

    if (schema) {
      setAnswers((prevAnswers) => {
        const updated: Record<string, any> = { ...prevAnswers };

        schema.sections.forEach((sec) => {
          sec.questions.forEach((q) => {
            const currentVal = prevAnswers[q.id];
            if (currentVal === undefined || currentVal === null || currentVal === "") {
              return;
            }

            const targetOptions = getOptionsForLang(sec.id, q, newLang);

            if (q.type === "single" && typeof currentVal === "string") {
              const idx = getOptionIndex(sec.id, q, currentVal);
              if (idx !== -1 && targetOptions[idx]) {
                updated[q.id] = targetOptions[idx];
              }
            } else if (q.type === "multi" && Array.isArray(currentVal)) {
              updated[q.id] = currentVal.map((item) => {
                const idx = getOptionIndex(sec.id, q, item);
                return idx !== -1 && targetOptions[idx] ? targetOptions[idx] : item;
              });
            }
            // Scale and free text responses remain unchanged
          });
        });

        return updated;
      });
    }

    setLanguage(newLang);
    setIsLangMenuOpen(false);
  };

  // Strict check if current question is answered before advancing
  const isCurrentQuestionAnswered = (q: FormQuestion): boolean => {
    if (!q.required) return true;
    const ans = answers[q.id];
    if (ans === undefined || ans === null || ans === "") return false;

    const sec = getSectionForQuestion(q.id);
    const secId = sec ? sec.id : "";

    if (q.type === "single") {
      if (typeof ans !== "string" || ans.trim().length === 0) return false;
      if (isOtherSelected(secId, q, ans)) {
        return !!otherValues[q.id] && otherValues[q.id].trim().length > 0;
      }
      return true;
    }

    if (q.type === "multi") {
      if (!Array.isArray(ans) || ans.length === 0) return false;
      if (isOtherSelected(secId, q, ans)) {
        return !!otherValues[q.id] && otherValues[q.id].trim().length > 0;
      }
      return true;
    }

    if (q.type === "scale") {
      return typeof ans === "number" && ans >= 1 && ans <= 5;
    }

    if (q.type === "text") {
      return typeof ans === "string" && ans.trim().length > 0;
    }

    return false;
  };

  const handleNextStep = () => {
    if (!currentStep || isTransitioning) return;

    // Validate if on a question step
    if (currentStep.type === "question" && currentStep.question) {
      if (!isCurrentQuestionAnswered(currentStep.question)) {
        setValidationError(currentStep.question.id);
        toast.error("Please answer this question to continue.");
        return;
      }
    }

    setValidationError(null);

    // If final step, submit
    if (isLastStep) {
      handleSubmit();
      return;
    }

    setIsTransitioning(true);
    setSlideDirection(1);
    setStepIndex((prev) => prev + 1);
    scrollToTop();
  };

  const handleBackStep = () => {
    if (isTransitioning) return;
    setValidationError(null);
    if (stepIndex === 0) {
      // If user has reached question 1 or beyond, or has answered questions,
      // backing out from Section 1 Splash would exit questionnaire to intro screen.
      // Show confirmation modal according to UX rules!
      if (maxStepReached >= 1 || answeredCount > 0) {
        setIsExitModalOpen(true);
        return;
      }
      setHasStarted(false);
      scrollToTop();
      return;
    }

    setIsTransitioning(true);
    setSlideDirection(-1);
    setStepIndex((prev) => prev - 1);
    scrollToTop();
  };

  const handleSubmit = async () => {
    if (!selectedRole || !schema) return;
    setIsSubmitting(true);

    const formattedResponses: Record<string, any> = {};
    const questionsMap: Record<string, string> = {};

    schema.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        questionsMap[q.id] = `Q${q.number}: ${q.question}`;
        let answerVal = answers[q.id];

        if (q.hasOther && otherValues[q.id] && isOtherSelected(sec.id, q, answerVal)) {
          if (typeof answerVal === "string") {
            answerVal = `Other: ${otherValues[q.id]}`;
          } else if (Array.isArray(answerVal)) {
            const otherIdx = q.options ? q.options.length - 1 : -1;
            answerVal = answerVal.map((item) =>
              item === "Other" || getOptionIndex(sec.id, q, item) === otherIdx
                ? `Other: ${otherValues[q.id]}`
                : item
            );
          }
        }

        formattedResponses[q.id] = answerVal !== undefined ? answerVal : "";
      });
    });

    try {
      await submitPGResearchForm({
        role: selectedRole,
        submittedAt: new Date().toISOString(),
        responses: formattedResponses,
        questionsMap,
      });

      clearFormDraft();
      clearResearchSubmissionStatus();
      setAnswers({});
      setOtherValues({});
      setIsSubmitting(false);
      setIsSubmitted(true);
      scrollToTop();
    } catch {
      clearFormDraft();
      clearResearchSubmissionStatus();
      setAnswers({});
      setOtherValues({});
      setIsSubmitting(false);
      setIsSubmitted(true);
      scrollToTop();
    }
  };

  const sourceExitPath = isFromBio ? "/links" : "/";
  const sourceExitLabel = isFromBio
    ? (language === "hi"
      ? "लिंक इन बायो पर वापस"
      : language === "hinglish"
        ? "Back to Link in Bio"
        : "Exit to Link in Bio")
    : (language === "hi"
      ? "पोर्टफोलियो पर वापस"
      : language === "hinglish"
        ? "Back to Portfolio"
        : "Exit to Portfolio");

  const sourceExitMobileLabel = isFromBio
    ? (language === "hi" ? "बायो" : "Link in Bio")
    : (language === "hi" ? "पोर्टफोलियो" : "Portfolio");

  const handleExitToSource = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    clearFormDraft();
    clearResearchSubmissionStatus();
    setAnswers({});
    setOtherValues({});
    setHasStarted(false);
    setSelectedRole(null);
    navigate(sourceExitPath);
  };

  const handleConnectMe = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    clearFormDraft();
    clearResearchSubmissionStatus();
    setAnswers({});
    setOtherValues({});
    setHasStarted(false);
    setSelectedRole(null);
    navigate("/links");
  };

  const locIntro = INTRO_TRANSLATIONS[language];
  const tExit = EXIT_MODAL_TRANSLATIONS[language] || EXIT_MODAL_TRANSLATIONS.en;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDFCF9] dark:bg-[#0D0F12] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200"
    >
      {/* ── Fixed Top Bar with Integrated Progress Line (Permanently locked to top of viewport) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#FDFCF9] dark:bg-[#0D0F12] border-b border-neutral-200 dark:border-neutral-800 transition-colors shadow-xs">
        {/* Progress bar attached directly to top of fixed header */}
        {hasStarted && !isSubmitted && (
          <div className="w-full h-1.5 sm:h-2 bg-neutral-200 dark:bg-neutral-800">
            <motion.div
              className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        <div className="max-w-2xl mx-auto py-3 sm:py-3.5 px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Exit Button: In quiz -> opens confirmation modal; On intro -> returns to referrer (Portfolio or Link in Bio) */}
          {hasStarted && !isSubmitted ? (
            <button
              type="button"
              onClick={() => {
                setIsExitModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors flex-shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "hi"
                  ? "प्रश्नावली से बाहर"
                  : language === "hinglish"
                    ? "Exit Questionnaire"
                    : "Exit Questionnaire"}
              </span>
              <span className="sm:hidden">
                {language === "hi" ? "बाहर" : "Exit"}
              </span>
            </button>
          ) : (
            <Link
              to={sourceExitPath}
              onClick={handleExitToSource}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors flex-shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{sourceExitLabel}</span>
              <span className="sm:hidden">{sourceExitMobileLabel}</span>
            </Link>
          )}

          {/* Center Brand Title */}
          <span className="text-sm sm:text-base font-bold tracking-wide text-neutral-800 dark:text-neutral-200 truncate">
            {language === "hi" ? "PG ऐप UX रिसर्च" : "PG App UX Research"}
          </span>

          {hasStarted && !isSubmitted && currentStep ? (
            <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 flex-shrink-0">
              {currentStep.type === "question"
                ? (language === "hi"
                  ? `प्रश्न ${currentStep.globalQuestionNumber} / ${currentStep.totalQuestions}`
                  : `Q ${currentStep.globalQuestionNumber} of ${currentStep.totalQuestions}`)
                : (language === "hi"
                  ? `भाग ${currentStep.sectionIndex + 1} / ${totalSections}`
                  : `Part ${currentStep.sectionIndex + 1} of ${totalSections}`)}
            </span>
          ) : (
            <div className="w-8 sm:w-16" />
          )}
        </div>
      </header>

      {/* Spacer so content starts smoothly below fixed header */}
      <div className={hasStarted && !isSubmitted ? "h-14 sm:h-16" : "h-12 sm:h-14"} aria-hidden="true" />

      {/* ── Content Container ── */}
      <main
        className={`max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14 ${!isSubmitted ? "pb-24 sm:pb-28" : ""
          }`}
      >
        {/* =========================================================
            SCREEN 1: HUMAN INTRO & ROLE PICKER (BEFORE STARTING)
            ========================================================= */}
        {!hasStarted && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Friendly Greeting Header */}
            <div className="space-y-3">
              <div className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                {locIntro.surveyBadge}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                {locIntro.heading}
              </h1>

              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {locIntro.subheading}
              </p>
            </div>

            {/* In Short: What to expect */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {locIntro.whatToExpect}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900 dark:text-white">
                      {locIntro.timeTitle}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                      {locIntro.timeSub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900 dark:text-white">
                      {locIntro.honestTitle}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                      {locIntro.honestSub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900 dark:text-white">
                      {locIntro.anonTitle}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                      {locIntro.anonSub}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Choose Your Role */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                {locIntro.rolePrompt}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tenant Radio Card */}
                <div
                  onClick={() => handleSelectRole("tenant")}
                  className={`p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-150 flex items-start gap-4 ${selectedRole === "tenant"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-500 shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                >
                  <div className="pt-0.5">
                    {/* Clear radio button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedRole === "tenant"
                        ? "border-emerald-600 bg-white dark:bg-neutral-900"
                        : "border-neutral-400 dark:border-neutral-600"
                        }`}
                    >
                      {selectedRole === "tenant" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <strong className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                        {selectedRole === "tenant" ? locIntro.tenantTitle : (language === "hi" ? "किरायेदार / छात्र" : language === "hinglish" ? "Tenant / Student" : "Tenant / Student")}
                      </strong>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {locIntro.tenantSub}
                    </p>
                  </div>
                </div>

                {/* Owner Radio Card */}
                <div
                  onClick={() => handleSelectRole("owner")}
                  className={`p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-150 flex items-start gap-4 ${selectedRole === "owner"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-500 shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                >
                  <div className="pt-0.5">
                    {/* Clear radio button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedRole === "owner"
                        ? "border-emerald-600 bg-white dark:bg-neutral-900"
                        : "border-neutral-400 dark:border-neutral-600"
                        }`}
                    >
                      {selectedRole === "owner" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <strong className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                        {selectedRole === "owner" ? locIntro.ownerTitle : (language === "hi" ? "PG मालिक / प्रबंधक" : language === "hinglish" ? "PG Owner / Manager" : "PG Owner / Manager")}
                      </strong>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {locIntro.ownerSub}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!selectedRole}
                onClick={() => {
                  if (selectedRole) {
                    setHasStarted(true);
                    setStepIndex(0);
                    setMaxStepReached(0);
                    setIsExitModalOpen(false);
                    setSlideDirection(1);
                    setIsTransitioning(false);
                    setValidationError(null);
                    scrollToTop();
                  }
                }}
                className={`w-full py-4 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-150 ${selectedRole
                  ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 cursor-pointer shadow-sm active:scale-[0.99]"
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                  }`}
              >
                <span>
                  {selectedRole
                    ? selectedRole === "tenant"
                      ? locIntro.startTenantBtn
                      : locIntro.startOwnerBtn
                    : locIntro.selectRolePrompt}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            SCREEN 2: QUIZ-STYLE QUESTIONNAIRE (ONE STEP AT A TIME)
            ========================================================= */}
        {hasStarted && schema && currentStep && !isSubmitted && (
          <div className="relative w-full overflow-hidden min-h-[440px]">
            <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
              {currentStep.type === "section-splash" ? (
                /* ── SECTION SPLASH CARD ── */
                <motion.div
                  key={`splash-${currentStep.sectionIndex}`}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onAnimationComplete={() => setIsTransitioning(false)}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-9 shadow-sm space-y-6"
                >
                  {(() => {
                    const locSec = getLocalizedSection(currentStep.section);
                    const qCount = currentStep.section.questions.length;
                    return (
                      <>
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                            {language === "hi"
                              ? `भाग ${currentStep.sectionIndex + 1} / ${totalSections}`
                              : `Part ${currentStep.sectionIndex + 1} of ${totalSections}`}
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white leading-tight">
                            {locSec.title
                              .replace(/^Section \d+:\s*/i, "")
                              .replace(/^Part \d+:\s*/i, "")
                              .replace(/^भाग \d+:\s*/i, "")}
                          </h2>

                          {locSec.subtitle && (
                            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              {locSec.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
                          <div className="flex items-center gap-2 font-medium">
                            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>
                              {language === "hi"
                                ? `इस भाग में ${qCount} प्रश्न हैं`
                                : language === "hinglish"
                                  ? `Is part mein ${qCount} questions hain`
                                  : `${qCount} questions in this part`}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold">
                            {language === "hi"
                              ? "एक-एक करके उत्तर दें"
                              : language === "hinglish"
                                ? "Ek-ek karke answer dein"
                                : "1 question at a time"}
                          </span>
                        </div>

                        {/* Navigation */}
                        <div className="pt-2 flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={handleBackStep}
                            className="px-5 py-3 sm:py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                          >
                            {language === "hi"
                              ? "< वापस"
                              : language === "hinglish"
                                ? "< Back"
                                : "< Back"}
                          </button>

                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm sm:text-base font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                          >
                            <span>
                              {language === "hi"
                                ? "प्रश्नोत्तरी जारी रखें"
                                : language === "hinglish"
                                  ? "Questions Shuru Karein"
                                  : "Continue to Questions"}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key={`q-${currentStep.question!.id}`}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onAnimationComplete={() => setIsTransitioning(false)}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm space-y-6"
                >
                  {(() => {
                    const q = currentStep.question!;
                    const locSec = getLocalizedSection(currentStep.section);
                    const locQ = getLocalizedQ(currentStep.section, q);
                    const currentAnswer = answers[q.id];
                    const hasError = validationError === q.id;

                    return (
                      <>
                        {/* Question Meta Header */}
                        <div className="space-y-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider truncate">
                              {language === "hi"
                                ? `भाग ${currentStep.sectionIndex + 1}`
                                : `Part ${currentStep.sectionIndex + 1}`}
                              {" · "}
                              {locSec.title
                                .replace(/^Section \d+:\s*/i, "")
                                .replace(/^Part \d+:\s*/i, "")
                                .replace(/^भाग \d+:\s*/i, "")}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/60 flex-shrink-0">
                              {language === "hi"
                                ? `प्रश्न ${currentStep.globalQuestionNumber} / ${currentStep.totalQuestions}`
                                : `Question ${currentStep.globalQuestionNumber} of ${currentStep.totalQuestions}`}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-snug">
                            <span>{locQ.question}</span>
                            {q.required && (
                              <span
                                className="text-red-500 ml-1 font-bold"
                                title="Required field"
                              >
                                *
                              </span>
                            )}
                          </h3>

                          {locQ.hint && (
                            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                              {locQ.hint}
                            </p>
                          )}
                        </div>

                        {/* Question Answer Inputs */}
                        <div className="space-y-3">
                          {/* 1. SINGLE SELECT (RADIO BUTTONS) */}
                          {q.type === "single" && locQ.options && (
                            <div className="space-y-2.5">
                              {locQ.options.map((opt, optIdx) => {
                                const isSelected = isOptionSelected(
                                  currentStep.section.id,
                                  q,
                                  currentAnswer,
                                  optIdx,
                                  opt
                                );
                                return (
                                  <div
                                    key={opt}
                                    onClick={() => handleSingleSelect(q.id, opt)}
                                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${isSelected
                                      ? "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 text-neutral-900 dark:text-white shadow-xs"
                                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                                      }`}
                                  >
                                    {/* Round Radio Marker */}
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected
                                        ? "border-emerald-600 bg-white dark:bg-neutral-900"
                                        : "border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                                        }`}
                                    >
                                      {isSelected && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                                      )}
                                    </div>
                                    <span className="text-sm sm:text-base font-medium leading-relaxed">
                                      {opt}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Custom "Other" Input */}
                              {q.hasOther &&
                                isOtherSelected(
                                  currentStep.section.id,
                                  q,
                                  currentAnswer
                                ) && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pt-1.5 pl-2"
                                  >
                                    <input
                                      type="text"
                                      value={otherValues[q.id] || ""}
                                      onChange={(e) => handleOtherTextChange(q.id, e.target.value)}
                                      placeholder={
                                        locQ.placeholder ||
                                        (selectedRole === "owner" && language === "hi"
                                          ? "कृपया विवरण लिखें..."
                                          : "Please specify...")
                                      }
                                      className="w-full text-base sm:text-base p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-neutral-900 dark:text-white placeholder-neutral-400"
                                      autoFocus
                                    />
                                  </motion.div>
                                )}
                            </div>
                          )}

                          {/* 2. MULTI SELECT (CONVENTIONAL SQUARE CHECKBOXES) */}
                          {q.type === "multi" && locQ.options && (
                            <div className="space-y-2.5">
                              <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                {selectedRole === "owner" && language === "hi"
                                  ? "(जो भी लागू हों, सब चुनें)"
                                  : selectedRole === "owner" && language === "hinglish"
                                    ? "(Jo apply hota ho, sab select karein)"
                                    : "(Select all that apply)"}
                              </span>

                              {locQ.options.map((opt, optIdx) => {
                                const isChecked = isOptionChecked(
                                  currentStep.section.id,
                                  q,
                                  currentAnswer,
                                  optIdx,
                                  opt
                                );
                                return (
                                  <div
                                    key={opt}
                                    onClick={() =>
                                      handleMultiToggle(
                                        currentStep.section.id,
                                        q,
                                        opt,
                                        optIdx
                                      )
                                    }
                                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${isChecked
                                      ? "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 text-neutral-900 dark:text-white shadow-xs"
                                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                                      }`}
                                  >
                                    {/* Conventional Square Checkbox Marker */}
                                    <div
                                      className={`w-5 h-5 rounded-[3px] border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked
                                        ? "border-emerald-600 bg-emerald-600 text-white"
                                        : "border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                                        }`}
                                    >
                                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                    </div>
                                    <span className="text-sm sm:text-base font-medium leading-relaxed">
                                      {opt}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Custom "Other" Input */}
                              {q.hasOther &&
                                isOtherSelected(
                                  currentStep.section.id,
                                  q,
                                  currentAnswer
                                ) && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pt-1.5 pl-2"
                                  >
                                    <input
                                      type="text"
                                      value={otherValues[q.id] || ""}
                                      onChange={(e) =>
                                        handleOtherTextChange(q.id, e.target.value)
                                      }
                                      placeholder={
                                        locQ.placeholder ||
                                        (selectedRole === "owner" && language === "hi"
                                          ? "कृपया विवरण लिखें..."
                                          : "Please specify...")
                                      }
                                      className="w-full text-base sm:text-base p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-neutral-900 dark:text-white placeholder-neutral-400"
                                      autoFocus
                                    />
                                  </motion.div>
                                )}
                            </div>
                          )}

                          {/* 3. SCALE (1 to 5) */}
                          {q.type === "scale" && (
                            <div className="space-y-3 pt-2">
                              <div className="grid grid-cols-5 gap-2.5">
                                {[1, 2, 3, 4, 5].map((val) => {
                                  const isSelected = currentAnswer === val;
                                  return (
                                    <button
                                      key={val}
                                      type="button"
                                      onClick={() => handleScaleSelect(q.id, val)}
                                      className={`h-12 sm:h-14 rounded-xl border-2 font-bold text-base sm:text-lg transition-all flex items-center justify-center cursor-pointer ${isSelected
                                        ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200 bg-neutral-50/50 dark:bg-neutral-800/30"
                                        }`}
                                    >
                                      {val}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 px-1">
                                <span>{locQ.scaleMinLabel || "1 - Very poor"}</span>
                                <span>{locQ.scaleMaxLabel || "5 - Excellent"}</span>
                              </div>
                            </div>
                          )}

                          {/* 4. FREE TEXT / TEXTAREA */}
                          {q.type === "text" && (
                            <div className="pt-1">
                              <textarea
                                rows={4}
                                value={typeof currentAnswer === "string" ? currentAnswer : ""}
                                onChange={(e) => handleTextChange(q.id, e.target.value)}
                                placeholder={
                                  locQ.placeholder ||
                                  (selectedRole === "owner" && language === "hi"
                                    ? "यहाँ अपने विचार लिखें..."
                                    : "Write your answer here...")
                                }
                                className="w-full text-base sm:text-base p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-neutral-900 dark:text-white placeholder-neutral-400 leading-relaxed"
                              />
                            </div>
                          )}
                        </div>

                        {/* Inline Validation Error Banner */}
                        {hasError && (
                          <motion.div
                            initial={{ opacity: 0, y: -4, x: 0 }}
                            animate={{ opacity: 1, y: 0, x: [-8, 8, -6, 6, -3, 3, 0] }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center gap-2.5 text-xs sm:text-sm text-red-700 dark:text-red-300 font-semibold"
                          >
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span>
                              {language === "hi"
                                ? "कृपया आगे बढ़ने से पहले इस प्रश्न का उत्तर दें।"
                                : language === "hinglish"
                                  ? "Aage badhne ke liye is question ka answer dein."
                                  : "Please answer this question to proceed."}
                            </span>
                          </motion.div>
                        )}

                        {/* Navigation Buttons (Back & Next / Submit) */}
                        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={handleBackStep}
                            className="px-5 py-3 sm:py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                          >
                            {language === "hi"
                              ? "< पिछला प्रश्न"
                              : language === "hinglish"
                                ? "< Previous"
                                : "< Back"}
                          </button>

                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleNextStep}
                            className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm sm:text-base font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                          >
                            {isSubmitting ? (
                              <span>
                                {language === "hi"
                                  ? "जवाब सबमिट हो रहे हैं..."
                                  : language === "hinglish"
                                    ? "Responses submit ho rahe hain..."
                                    : "Submitting responses..."}
                              </span>
                            ) : isLastStep ? (
                              <>
                                <span>
                                  {language === "hi"
                                    ? "जवाब सबमिट करें"
                                    : language === "hinglish"
                                      ? "Responses Submit Karein"
                                      : "Submit Responses"}
                                </span>
                                <CheckCircle2 className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>
                                  {language === "hi"
                                    ? "अगला प्रश्न>"
                                    : language === "hinglish"
                                      ? "Next Question >"
                                      : "Next Question >"}
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* =========================================================
            SCREEN 3: CLEAN HUMAN THANK YOU
            ========================================================= */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-12 max-w-md mx-auto"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Thank you so much! 🎉
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Your responses have been recorded safely. Your input helps me design
                realistic personas and functional solutions for the upcoming PG
                Management UX Case Study and improve the User Experience of existing app like RentOK.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetForNewSubmission}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Response</span>
              </button>

              <Link
                to="/links"
                onClick={handleConnectMe}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-colors shadow-sm cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>
                  {language === "hi" ? "मुझसे जुड़ें (Connect Me)" : "Connect Me"}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      {/* ── STICKY SIDE TRANSLATOR WITH DROPDOWN MENU & RADIO BUTTONS ── */}
      {!isSubmitted && (
        <div
          ref={langMenuRef}
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 select-none"
        >
          {/* Dropdown Menu with Radio Buttons */}
          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.16 }}
                className="mb-2.5 w-64 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl border border-neutral-200/90 dark:border-neutral-700/90 shadow-2xl shadow-black/20 overflow-hidden"
              >
                {/* Menu Header */}
                <div className="px-4 py-2.5 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between bg-neutral-50/60 dark:bg-neutral-800/40">
                  <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Language / भाषा</span>
                  </span>

                </div>

                {/* Radio Options List */}
                <div className="p-2 space-y-1">
                  {[
                    {
                      id: "en" as const,
                      label: "English",
                      sublabel: "Standard English questionnaire",
                      toastMsg: "Switched form language to English",
                    },
                    {
                      id: "hi" as const,
                      label: "हिंदी (Hindi)",
                      sublabel: "देवनागरी लिपि में प्रश्न एवं उत्तर",
                      toastMsg: "प्रश्नावली की भाषा बदलकर हिंदी की गई",
                    },
                    {
                      id: "hinglish" as const,
                      label: "Hinglish",
                      sublabel: "Everyday conversational Roman Hindi",
                      toastMsg: "Language switched to Hinglish",
                    },
                  ].map((item) => {
                    const isSelected = language === item.id;
                    return (
                      <label
                        key={item.id}
                        onClick={() => {
                          handleLanguageChange(item.id);
                          toast.success(item.toastMsg, { duration: 1500 });
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${isSelected
                          ? "bg-emerald-50/70 dark:bg-emerald-950/40 text-neutral-900 dark:text-white"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300"
                          }`}
                      >
                        {/* Round Radio Button Circle */}
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected
                            ? "border-emerald-600 bg-white dark:bg-neutral-900"
                            : "border-neutral-400 dark:border-neutral-600"
                            }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-emerald-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="block text-sm font-bold leading-tight">
                            {item.label}
                          </span>
                          <span className="block text-xs text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5">
                            {item.sublabel}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Translator Icon Button */}
          <button
            type="button"
            onClick={() => setIsLangMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-white/95 dark:bg-neutral-900/95 hover:bg-neutral-50 dark:hover:bg-neutral-800 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-neutral-200/90 dark:border-neutral-700/90 shadow-xl shadow-black/15 transition-all cursor-pointer active:scale-95 ml-auto"
            aria-label="Toggle language menu"
            title="Click to change form language"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Languages className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
              <span>{language === "hi" ? "हिंदी" : language === "hinglish" ? "Hinglish" : "English"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isLangMenuOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      )}

      {/* =========================================================
          CONFIRMATION MODAL: EXIT / ABANDON QUESTIONNAIRE
          Strictly follows modern UX heuristics:
          1. Safe default action ("Continue Answering" is primary & auto-focused)
          2. Clear, transparent consequence ("Your responses will not be saved")
          3. Progress context card with visual progress bar (Loss aversion)
          4. Descriptive action verbs (Never generic Yes/No)
          5. Full accessibility (Escape key, Outside click, X button, scroll lock, a11y attributes)
          6. Multi-language localization (EN, HI, Hinglish)
          ========================================================= */}
      <AnimatePresence>
        {isExitModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
            aria-describedby="exit-modal-description"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCancelExit}
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-[28px] p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 overflow-hidden z-10"
            >
              {/* Subtle decorative gradient glow at the top */}
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-36 bg-gradient-to-b from-amber-500/15 via-emerald-500/10 to-transparent blur-2xl pointer-events-none rounded-full"
                aria-hidden="true"
              />

              {/* Close Button (X) */}
              <button
                type="button"
                onClick={handleCancelExit}
                aria-label="Close dialog and continue questionnaire"
                className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon & Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/60">
                    {tExit.badge}
                  </span>
                  <h3
                    id="exit-modal-title"
                    className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5"
                  >
                    {tExit.title}
                  </h3>
                </div>
              </div>

              {/* Explanation text */}
              <p
                id="exit-modal-description"
                className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                {tExit.description}
              </p>

              {/* Progress Card (Loss Aversion Heuristic) */}
              {totalQuestions > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                    <span>{tExit.progressLabel}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {answeredCount} / {totalQuestions} {tExit.progressSuffix} ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Action Button Row */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:gap-3">
                {/* Secondary Destructive Button */}
                <button
                  type="button"
                  onClick={handleConfirmExit}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer text-center"
                >
                  {tExit.exitBtn}
                </button>

                {/* Primary Safe Button (Auto-focused) */}
                <button
                  ref={continueBtnRef}
                  type="button"
                  onClick={handleCancelExit}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 transition-all shadow-sm active:scale-[0.98] cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <span>{tExit.continueBtn}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
