import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router";
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
} from "./pgTranslations";
import {
  submitPGResearchForm,
  saveFormDraft,
  getFormDraft,
  clearFormDraft,
  getResearchSubmissionStatus,
  markResearchSubmitted,
  clearResearchSubmissionStatus,
} from "../../utils/pgResearchSubmit";

export const PGResearchForm = () => {
  // Selected role: null (intro screen) | 'tenant' | 'owner'
  const [selectedRole, setSelectedRole] = useState<"tenant" | "owner" | null>(null);

  // Started state: false = intro/role selection, true = answering questions
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Current step in the quiz flow (0 = Section 1 Splash, 1 = Q1, etc.)
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Slide transition direction: 1 = forward, -1 = backward
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Validation error on current question (if required and uncompleted)
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form responses: question ID -> answer
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Custom text for "Other" option
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Submitted state (persisted across visits so user cannot fill form again)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    return getResearchSubmissionStatus()?.submitted === true;
  });

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

  // Localized section details
  const getLocalizedSection = (sec: FormSection) => {
    if (selectedRole === "owner" && OWNER_TRANSLATIONS[language]) {
      const tSec = OWNER_TRANSLATIONS[language].sections[sec.id];
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

  // Localized question details
  const getLocalizedQ = (sec: FormSection, q: FormQuestion) => {
    if (selectedRole === "owner" && OWNER_TRANSLATIONS[language]) {
      const tSec = OWNER_TRANSLATIONS[language].sections[sec.id];
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

  // Restore draft if saved (only if not already submitted)
  useEffect(() => {
    if (isSubmitted) return;
    if (selectedRole) {
      const saved = getFormDraft(selectedRole);
      if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
        setAnswers(saved.answers);
        setOtherValues(saved.otherValues || {});
        if (typeof saved.stepIndex === "number" && saved.stepIndex >= 0) {
          setStepIndex(saved.stepIndex);
        }
      }
    }
  }, [selectedRole, isSubmitted]);

  // Auto-save draft
  useEffect(() => {
    if (isSubmitted) return;
    if (selectedRole && Object.keys(answers).length > 0) {
      saveFormDraft(selectedRole, { answers, otherValues, stepIndex });
    }
  }, [selectedRole, answers, otherValues, stepIndex, isSubmitted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form completely for a fresh new submission (no prefilled answers)
  const handleResetForNewSubmission = () => {
    clearResearchSubmissionStatus();
    clearFormDraft();
    setAnswers({});
    setOtherValues({});
    setValidationError(null);
    setStepIndex(0);
    setHasStarted(false);
    setSelectedRole(null);
    setIsSubmitted(false);
    setIsLangMenuOpen(false);
    scrollToTop();
    toast.success("Ready for a new submission! Form has been cleared.", { duration: 2500 });
  };

  const handleSingleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setValidationError(null);
  };

  const handleMultiToggle = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const currentList: string[] = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const updated = currentList.includes(option)
        ? currentList.filter((item) => item !== option)
        : [...currentList, option];
      return { ...prev, [questionId]: updated };
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

  // Check if current question is answered before advancing
  const isCurrentQuestionAnswered = (q: FormQuestion): boolean => {
    if (!q.required) return true;
    const ans = answers[q.id];
    if (ans === undefined || ans === null || ans === "") return false;

    if (q.type === "single") {
      if (ans === "Other" && q.hasOther) {
        return !!otherValues[q.id] && otherValues[q.id].trim().length > 0;
      }
      return true;
    }

    if (q.type === "multi") {
      if (!Array.isArray(ans) || ans.length === 0) return false;
      if (ans.includes("Other") && q.hasOther) {
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

    return true;
  };

  const handleNextStep = () => {
    if (!currentStep) return;

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

    setSlideDirection(1);
    setStepIndex((prev) => prev + 1);
    scrollToTop();
  };

  const handleBackStep = () => {
    setValidationError(null);
    if (stepIndex === 0) {
      setHasStarted(false);
      scrollToTop();
      return;
    }

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

        if (q.hasOther && otherValues[q.id]) {
          if (answerVal === "Other") {
            answerVal = `Other: ${otherValues[q.id]}`;
          } else if (Array.isArray(answerVal) && answerVal.includes("Other")) {
            answerVal = answerVal.map((item) =>
              item === "Other" ? `Other: ${otherValues[q.id]}` : item
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

      markResearchSubmitted(selectedRole);
      clearFormDraft();
      setAnswers({});
      setOtherValues({});
      setIsSubmitting(false);
      setIsSubmitted(true);
      scrollToTop();
    } catch {
      markResearchSubmitted(selectedRole);
      clearFormDraft();
      setAnswers({});
      setOtherValues({});
      setIsSubmitting(false);
      setIsSubmitted(true);
      scrollToTop();
    }
  };

  // Answered questions count for gamified progress calculation
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDFCF9] dark:bg-[#0D0F12] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200"
    >
      {/* ── Thick Sticky Progress Bar Attached to Top Edge ── */}
      {hasStarted && !isSubmitted && (
        <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-neutral-200 dark:bg-neutral-800">
          <motion.div
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* ── Sticky Clean Top Bar ── */}
      <header
        className={`sticky top-0 z-40 bg-[#FDFCF9]/95 dark:bg-[#0D0F12]/95 backdrop-blur-sm border-b border-neutral-200/80 dark:border-neutral-800/80 py-3.5 px-4 sm:px-8 transition-colors ${
          hasStarted ? "mt-2" : ""
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Portfolio</span>
            <span className="sm:hidden">Exit</span>
          </Link>

          <span className="text-xs sm:text-sm font-bold tracking-wide text-neutral-800 dark:text-neutral-200 truncate">
            PG App UX Research
          </span>

          {hasStarted && !isSubmitted && currentStep ? (
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 flex-shrink-0">
              {currentStep.type === "question"
                ? `Q ${currentStep.globalQuestionNumber} of ${currentStep.totalQuestions}`
                : `Part ${currentStep.sectionIndex + 1} of ${totalSections}`}
            </span>
          ) : (
            <div className="w-8 sm:w-16" />
          )}
        </div>
      </header>

      {/* ── Content Container ── */}
      <main
        className={`max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14 ${
          selectedRole === "owner" && !isSubmitted ? "pb-24 sm:pb-28" : ""
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
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                User Research Survey
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                Hey there! Help me build a better PG Management App.
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Hi, I’m Navneet, a UI/UX designer building a case study for a simpler PG management app for owners and tenants. Existing apps like RentOk do a lot, but I believe the everyday experience can be much easier. Your 3-minute response will help me improve real frustrations like rent tracking, maintenance delays and document safety.
              </p>
            </div>

            {/* In Short: What to expect */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                What to expect
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-neutral-900 dark:text-white">
                      Takes ~3 minutes
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      4 short, simple sections
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-neutral-900 dark:text-white">
                      No right or wrong
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Just your honest story
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-neutral-900 dark:text-white">
                      100% Anonymous
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      No spam, strictly research
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Choose Your Role */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Please select which describes you best:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tenant Radio Card */}
                <div
                  onClick={() => setSelectedRole("tenant")}
                  className={`p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-150 flex items-start gap-4 ${
                    selectedRole === "tenant"
                      ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-500 shadow-sm"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="pt-0.5">
                    {/* Clear radio button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedRole === "tenant"
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
                      <strong className="text-base font-bold text-neutral-900 dark:text-white">
                        Tenant / Student
                      </strong>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      I live (or have lived) in a PG or hostel. I deal with rent payments,
                      complaints, and sharing ID documents.
                    </p>
                  </div>
                </div>

                {/* Owner Radio Card */}
                <div
                  onClick={() => setSelectedRole("owner")}
                  className={`p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-150 flex items-start gap-4 ${
                    selectedRole === "owner"
                      ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-500 shadow-sm"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="pt-0.5">
                    {/* Clear radio button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedRole === "owner"
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
                      <strong className="text-base font-bold text-neutral-900 dark:text-white">
                        PG Owner / Manager
                      </strong>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      I own or manage a PG/hostel property. I track rents, collect payments,
                      verify KYC, and handle complaints.
                    </p>
                    {/* {selectedRole === "owner" && (
                      <div className="pt-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <Languages className="w-3.5 h-3.5" />
                        <span>Translator ready: English • हिंदी • Hinglish</span>
                      </div>
                    )} */}
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
                    setSlideDirection(1);
                    scrollToTop();
                  }
                }}
                className={`w-full py-4 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 ${
                  selectedRole
                    ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 cursor-pointer shadow-sm active:scale-[0.99]"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                }`}
              >
                <span>
                  {selectedRole
                    ? selectedRole === "tenant"
                      ? "Start Tenant Questionnaire →"
                      : language === "hi"
                      ? "ओनर प्रश्नावली शुरू करें →"
                      : language === "hinglish"
                      ? "Owner Questionnaire Shuru Karein →"
                      : "Start Owner Questionnaire →"
                    : "Select an option above to continue"}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            SCREEN 2: QUIZ-STYLE QUESTIONNAIRE (ONE STEP AT A TIME)
            ========================================================= */}
        {hasStarted && schema && currentStep && !isSubmitted && (
          <div className="space-y-6">
            <AnimatePresence mode="wait" custom={slideDirection}>
              {currentStep.type === "section-splash" ? (
                /* ── SECTION SPLASH CARD ── */
                <motion.div
                  key={`splash-${currentStep.sectionIndex}`}
                  custom={slideDirection}
                  initial={{ opacity: 0, x: slideDirection * 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 25 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-9 shadow-sm space-y-6"
                >
                  {(() => {
                    const locSec = getLocalizedSection(currentStep.section);
                    const qCount = currentStep.section.questions.length;
                    return (
                      <>
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                            {selectedRole === "owner" && language === "hi"
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
                            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              {locSec.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
                          <div className="flex items-center gap-2 font-medium">
                            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>
                              {selectedRole === "owner" && language === "hi"
                                ? `इस भाग में ${qCount} प्रश्न हैं`
                                : selectedRole === "owner" && language === "hinglish"
                                ? `Is part mein ${qCount} questions hain`
                                : `${qCount} questions in this part`}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold">
                            {selectedRole === "owner" && language === "hi"
                              ? "एक-एक करके उत्तर दें"
                              : selectedRole === "owner" && language === "hinglish"
                              ? "Ek-ek karke answer dein"
                              : "1 question at a time"}
                          </span>
                        </div>

                        {/* Navigation */}
                        <div className="pt-2 flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={handleBackStep}
                            className="px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                          >
                            {selectedRole === "owner" && language === "hi"
                              ? "← वापस"
                              : selectedRole === "owner" && language === "hinglish"
                              ? "← Back"
                              : "← Back"}
                          </button>

                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 sm:px-8 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                          >
                            <span>
                              {selectedRole === "owner" && language === "hi"
                                ? "प्रश्नोत्तरी जारी रखें →"
                                : selectedRole === "owner" && language === "hinglish"
                                ? "Questions Shuru Karein →"
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
                /* ── SINGLE QUESTION CARD ── */
                <motion.div
                  key={`q-${currentStep.question!.id}`}
                  custom={slideDirection}
                  initial={{ opacity: 0, x: slideDirection * 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 25 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm space-y-6"
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
                            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider truncate">
                              {selectedRole === "owner" && language === "hi"
                                ? `भाग ${currentStep.sectionIndex + 1}`
                                : `Part ${currentStep.sectionIndex + 1}`}
                              {" · "}
                              {locSec.title
                                .replace(/^Section \d+:\s*/i, "")
                                .replace(/^Part \d+:\s*/i, "")
                                .replace(/^भाग \d+:\s*/i, "")}
                            </span>
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/60 flex-shrink-0">
                              {selectedRole === "owner" && language === "hi"
                                ? `प्रश्न ${currentStep.globalQuestionNumber} / ${currentStep.totalQuestions}`
                                : `Question ${currentStep.globalQuestionNumber} of ${currentStep.totalQuestions}`}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-snug">
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
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                              {locQ.hint}
                            </p>
                          )}
                        </div>

                        {/* Question Answer Inputs */}
                        <div className="space-y-3">
                          {/* 1. SINGLE SELECT (RADIO BUTTONS) */}
                          {q.type === "single" && locQ.options && (
                            <div className="space-y-2.5">
                              {locQ.options.map((opt) => {
                                const isSelected = currentAnswer === opt;
                                return (
                                  <div
                                    key={opt}
                                    onClick={() => handleSingleSelect(q.id, opt)}
                                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                      isSelected
                                        ? "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 text-neutral-900 dark:text-white shadow-xs"
                                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                                    }`}
                                  >
                                    {/* Round Radio Marker */}
                                    <div
                                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                        isSelected
                                          ? "border-emerald-600 bg-white dark:bg-neutral-900"
                                          : "border-neutral-400 dark:border-neutral-600"
                                      }`}
                                    >
                                      {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                      )}
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                                      {opt}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Custom "Other" Input */}
                              {q.hasOther && currentAnswer === "Other" && (
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
                                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-neutral-900 dark:text-white placeholder-neutral-400"
                                    autoFocus
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* 2. MULTI SELECT (SQUARE CHECKBOXES) */}
                          {q.type === "multi" && locQ.options && (
                            <div className="space-y-2.5">
                              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                {selectedRole === "owner" && language === "hi"
                                  ? "(जो भी लागू हों, सब चुनें)"
                                  : selectedRole === "owner" && language === "hinglish"
                                  ? "(Jo apply hota ho, sab select karein)"
                                  : "(Select all that apply)"}
                              </span>

                              {locQ.options.map((opt) => {
                                const isChecked =
                                  Array.isArray(currentAnswer) && currentAnswer.includes(opt);
                                return (
                                  <div
                                    key={opt}
                                    onClick={() => handleMultiToggle(q.id, opt)}
                                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                      isChecked
                                        ? "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 text-neutral-900 dark:text-white shadow-xs"
                                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                                    }`}
                                  >
                                    {/* Square Checkbox Marker */}
                                    <div
                                      className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                        isChecked
                                          ? "border-emerald-600 bg-emerald-600 text-white"
                                          : "border-neutral-400 dark:border-neutral-600 bg-transparent"
                                      }`}
                                    >
                                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                                      {opt}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Custom "Other" Input */}
                              {q.hasOther &&
                                Array.isArray(currentAnswer) &&
                                currentAnswer.includes("Other") && (
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
                                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-neutral-900 dark:text-white placeholder-neutral-400"
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
                                      className={`h-12 sm:h-14 rounded-xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-center cursor-pointer ${
                                        isSelected
                                          ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                                          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200 bg-neutral-50/50 dark:bg-neutral-800/30"
                                      }`}
                                    >
                                      {val}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 px-1">
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
                                className="w-full text-xs sm:text-sm p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-neutral-900 dark:text-white placeholder-neutral-400 leading-relaxed"
                              />
                            </div>
                          )}
                        </div>

                        {/* Inline Validation Error Banner */}
                        {hasError && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center gap-2.5 text-xs text-red-700 dark:text-red-300 font-semibold"
                          >
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span>
                              {selectedRole === "owner" && language === "hi"
                                ? "कृपया आगे बढ़ने से पहले इस प्रश्न का उत्तर दें।"
                                : selectedRole === "owner" && language === "hinglish"
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
                            className="px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                          >
                            {selectedRole === "owner" && language === "hi"
                              ? "← पिछला प्रश्न"
                              : selectedRole === "owner" && language === "hinglish"
                              ? "← Previous"
                              : "← Back"}
                          </button>

                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleNextStep}
                            className="px-6 sm:px-8 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                          >
                            {isSubmitting ? (
                              <span>
                                {selectedRole === "owner" && language === "hi"
                                  ? "जवाब सबमिट हो रहे हैं..."
                                  : selectedRole === "owner" && language === "hinglish"
                                  ? "Responses submit ho rahe hain..."
                                  : "Submitting responses..."}
                              </span>
                            ) : isLastStep ? (
                              <>
                                <span>
                                  {selectedRole === "owner" && language === "hi"
                                    ? "जवाब सबमिट करें"
                                    : selectedRole === "owner" && language === "hinglish"
                                    ? "Responses Submit Karein"
                                    : "Submit Responses"}
                                </span>
                                <CheckCircle2 className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>
                                  {selectedRole === "owner" && language === "hi"
                                    ? "अगला प्रश्न →"
                                    : selectedRole === "owner" && language === "hinglish"
                                    ? "Next Question →"
                                    : "Next Question →"}
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
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Your responses have been recorded safely. Your input helps me design
                realistic personas and functional solutions for the upcoming PG
                Management UX Case Study and improve the User Experience of existing app like RentOK.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetForNewSubmission}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Response</span>
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
              >
                <Home className="w-4 h-4" />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      {/* ── STICKY SIDE TRANSLATOR WITH DROPDOWN MENU & RADIO BUTTONS ── */}
      {selectedRole === "owner" && !isSubmitted && (
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
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
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
                          setLanguage(item.id);
                          toast.success(item.toastMsg, { duration: 1500 });
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-emerald-50/70 dark:bg-emerald-950/40 text-neutral-900 dark:text-white"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {/* Round Radio Button Circle */}
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? "border-emerald-600 bg-white dark:bg-neutral-900"
                              : "border-neutral-400 dark:border-neutral-600"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-emerald-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="block text-xs font-bold leading-tight">
                            {item.label}
                          </span>
                          <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5">
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

            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200">
              <span>{language === "hi" ? "हिंदी" : language === "hinglish" ? "Hinglish" : "English"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                  isLangMenuOpen ? "rotate-180 text-emerald-600" : ""
                }`}
              />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
