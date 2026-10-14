import { useState, useEffect, useRef } from "react";
import { PORTRAIT_SRC } from "./portraitData";

export const LinkInBio = () => {
  const [mood, setMood] = useState<number>(0);
  const [copyLabel, setCopyLabel] = useState<string>("Copy");
  const mailRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Set page title as specified
    const prevTitle = document.title;
    document.title = "Navneet Patidar";

    // Ensure Google fonts link is present
    const fontId = "link-in-bio-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }

    return () => {
      document.title = prevTitle;
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = () => {
    const text = mailRef.current ? mailRef.current.textContent?.trim() || "" : "designer.navneet.patidar@gmail.com";

    const selectText = () => {
      try {
        if (mailRef.current) {
          const range = document.createRange();
          range.selectNodeContents(mailRef.current);
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } catch {
        // ignore selection fallback error
      }
      setCopyLabel("Selected");
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyLabel("Copy"), 1800);
    };

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => {
            setCopyLabel("Copied");
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
            copyTimerRef.current = setTimeout(() => setCopyLabel("Copy"), 1800);
          },
          () => selectText()
        );
      } else {
        selectText();
      }
    } catch {
      selectText();
    }
  };

  return (
    <div className="link-in-bio-page" data-mood={mood}>
      <style>{`
        .link-in-bio-page {
          --bg: #ECEEF2;
          --surface: #F8F9FB;
          --ink: #14161F;
          --muted: #565B6C;
          --edge: #14161F;
          --shadow: #14161F;
          --grid: rgba(20, 22, 31, 0.1);
          --a1: #14566F;
          --a2: #C94A12;
          --a3: #A35A00;
          --a4: #2B3A8F;
          --on-accent: #FFFFFF;
          --accent: var(--a1);
          --display: "Bricolage Grotesque", "Arial Black", system-ui, sans-serif;
          --body: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
          --mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

          background-color: var(--bg);
          background-image: radial-gradient(var(--grid) 1.2px, transparent 1.4px);
          background-size: 18px 18px;
          color: var(--ink);
          font-family: var(--body);
          font-size: 16px;
          line-height: 1.5;
          min-height: 100vh;
          width: 100%;
          padding-left: max(16px, env(safe-area-inset-left, 0px));
          padding-right: max(16px, env(safe-area-inset-right, 0px));
          padding-top: max(20px, env(safe-area-inset-top, 0px));
          padding-bottom: max(36px, env(safe-area-inset-bottom, 0px));
          box-sizing: border-box;
          transition: background-color .25s, color .25s;
        }

        @media (prefers-color-scheme: dark) {
          .link-in-bio-page:not([data-theme="light"]) {
            --bg: #0E1016;
            --surface: #171A22;
            --ink: #F1F2F6;
            --muted: #A0A6B8;
            --edge: #3A4054;
            --shadow: var(--accent);
            --grid: rgba(255, 255, 255, 0.08);
            --a1: #4FB3D1;
            --a2: #FF8A52;
            --a3: #FFB84D;
            --a4: #8FA0FF;
            --on-accent: #0E1016;
            color-scheme: dark;
          }
        }

        .link-in-bio-page[data-theme="dark"] {
          --bg: #0E1016;
          --surface: #171A22;
          --ink: #F1F2F6;
          --muted: #A0A6B8;
          --edge: #3A4054;
          --shadow: var(--accent);
          --grid: rgba(255, 255, 255, 0.08);
          --a1: #4FB3D1;
          --a2: #FF8A52;
          --a3: #FFB84D;
          --a4: #8FA0FF;
          --on-accent: #0E1016;
          color-scheme: dark;
        }

        .link-in-bio-page[data-mood="1"] { --accent: var(--a2); }
        .link-in-bio-page[data-mood="2"] { --accent: var(--a3); }
        .link-in-bio-page[data-mood="3"] { --accent: var(--a4); }

        .link-in-bio-page * { box-sizing: border-box; }
        .link-in-bio-page a, .link-in-bio-page button { -webkit-tap-highlight-color: transparent; }
        .link-in-bio-page :focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }

        .link-in-bio-page .wrap {
          max-width: 440px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .link-in-bio-page .bar {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-family: var(--mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Hero */
        .link-in-bio-page .hero {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 18px;
          align-items: end;
        }
        .link-in-bio-page .frame-wrap {
          position: relative;
          margin: 6px 4px 32px 6px;
        }
        .link-in-bio-page .frame {
          position: relative;
          width: 176px;
          height: 220px;
          border: 1.5px solid var(--accent);
          transition: border-color .25s;
        }
        .link-in-bio-page .frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .link-in-bio-page .h {
          position: absolute;
          width: 10px;
          height: 10px;
          background: var(--surface);
          border: 1.5px solid var(--accent);
          transition: border-color .25s;
        }
        .link-in-bio-page .h.tl { left: -6px; top: -6px; }
        .link-in-bio-page .h.tr { right: -6px; top: -6px; }
        .link-in-bio-page .h.bl { left: -6px; bottom: -6px; }
        .link-in-bio-page .h.br { right: -6px; bottom: -6px; }

        .link-in-bio-page .size-tag {
          position: absolute;
          left: 0;
          top: calc(100% + 12px);
          font-family: var(--mono);
          font-size: 0.66rem;
          line-height: 1;
          padding: 4px 6px;
          border-radius: 3px;
          background: var(--accent);
          color: var(--on-accent);
          transition: background-color .25s;
          white-space: nowrap;
        }
        .link-in-bio-page .cursor {
          position: absolute;
          right: -10px;
          bottom: -24px;
          display: flex;
          align-items: flex-start;
          pointer-events: none;
        }
        .link-in-bio-page .cursor svg {
          width: 18px;
          height: 18px;
          fill: var(--ink);
          stroke: var(--surface);
          stroke-width: 1.5;
        }
        .link-in-bio-page .cursor .pill {
          margin: 12px 0 0 -4px;
          font-family: var(--mono);
          font-size: 0.66rem;
          line-height: 1;
          padding: 4px 7px;
          border-radius: 3px 8px 8px 8px;
          background: var(--ink);
          color: var(--bg);
        }

        .link-in-bio-page .picker {
          display: grid;
          gap: 8px;
          margin-bottom: 30px;
        }
        .link-in-bio-page .picker h2 {
          margin: 0 0 2px;
          font-family: var(--mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }
        .link-in-bio-page .picker button {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 36px;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 0.74rem;
          color: var(--muted);
          text-align: left;
        }
        .link-in-bio-page .picker i {
          width: 24px;
          height: 24px;
          flex: none;
          border: 1.5px solid var(--edge);
          background: var(--sw);
          transition: transform .15s ease;
        }
        .link-in-bio-page .picker button[aria-pressed="true"] {
          color: var(--ink);
          font-weight: 500;
        }
        .link-in-bio-page .picker button[aria-pressed="true"] i {
          outline: 2px solid var(--ink);
          outline-offset: 2px;
        }
        @media (hover: hover) {
          .link-in-bio-page .picker button:hover i {
            transform: rotate(-6deg) scale(1.08);
          }
        }

        /* Intro */
        .link-in-bio-page .intro { display: grid; gap: 14px; }
        .link-in-bio-page h1 {
          margin: 0;
          display: flex;
          flex-direction: column;
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(3rem, 16vw, 4.5rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-variation-settings: "opsz" 96;
        }
        .link-in-bio-page h1 .two {
          color: var(--accent);
          transition: color .25s;
        }
        .link-in-bio-page .lede {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.55;
          text-wrap: pretty;
        }
        .link-in-bio-page .lede.second {
          font-size: 1rem;
          color: var(--muted);
        }
        .link-in-bio-page .lede mark {
          color: inherit;
          padding: 0 2px;
          margin: 0 -2px;
          background: linear-gradient(transparent 56%, color-mix(in srgb, var(--accent) 40%, transparent) 56%);
        }

        /* Sections */
        .link-in-bio-page .section { display: grid; gap: 12px; }
        .link-in-bio-page .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          font-family: var(--mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }
        .link-in-bio-page .eyebrow::after {
          content: "";
          flex: 1;
          border-top: 1px dashed var(--muted);
          opacity: 0.5;
        }
        .link-in-bio-page ul.links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 14px;
        }

        /* Cards */
        .link-in-bio-page .card {
          display: grid;
          grid-template-columns: 78px minmax(0, 1fr) auto;
          align-items: stretch;
          color: inherit;
          text-decoration: none;
          background: var(--surface);
          border: 1.5px solid var(--edge);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 3px 3px 0 var(--shadow);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .link-in-bio-page .chip {
          background: var(--c);
          color: #14161F;
          min-height: 78px;
          padding: 9px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1.5px solid var(--edge);
        }
        .link-in-bio-page .chip b {
          font-family: var(--display);
          font-weight: 800;
          font-size: 1.5rem;
          line-height: 1;
          letter-spacing: -0.03em;
          font-variation-settings: "opsz" 48;
        }
        .link-in-bio-page .logo {
          width: 30px;
          height: 30px;
          display: block;
          flex: none;
        }
        .link-in-bio-page .chip small {
          font-family: var(--mono);
          font-size: 0.6rem;
          letter-spacing: 0.04em;
          opacity: 0.8;
        }
        .link-in-bio-page .txt {
          padding: 12px 8px 12px 14px;
          display: grid;
          align-content: center;
          min-width: 0;
        }
        .link-in-bio-page .txt strong {
          font-family: var(--display);
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .link-in-bio-page .txt span {
          font-size: 0.85rem;
          line-height: 1.35;
          color: var(--muted);
          overflow-wrap: anywhere;
        }
        .link-in-bio-page .go {
          display: grid;
          place-items: center;
          padding-right: 14px;
        }
        .link-in-bio-page .go svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform .15s ease;
        }
        .link-in-bio-page .card:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 var(--shadow);
        }
        @media (hover: hover) {
          .link-in-bio-page .card:hover {
            transform: translate(-2px, -2px);
            box-shadow: 5px 5px 0 var(--shadow);
          }
          .link-in-bio-page .card:hover .go svg {
            transform: translate(2px, -2px);
          }
        }
        .link-in-bio-page .card.feature {
          background: var(--ink);
          color: var(--bg);
          border-color: var(--ink);
          box-shadow: 4px 4px 0 var(--accent);
        }
        .link-in-bio-page .card.feature .chip {
          border-right-color: var(--ink);
          min-height: 84px;
        }
        .link-in-bio-page .card.feature .txt strong {
          font-size: 1.4rem;
        }
        .link-in-bio-page .card.feature:active {
          box-shadow: 1px 1px 0 var(--accent);
        }
        @media (hover: hover) {
          .link-in-bio-page .card.feature:hover {
            box-shadow: 6px 6px 0 var(--accent);
          }
        }

        /* Mailbox */
        .link-in-bio-page .mailbox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: var(--surface);
          border: 1.5px dashed var(--edge);
          border-radius: 10px;
          padding: 6px 6px 6px 14px;
        }
        .link-in-bio-page .mailbox code {
          font-family: var(--mono);
          font-size: 0.8rem;
          min-width: 0;
          overflow-wrap: anywhere;
          user-select: all;
        }
        .link-in-bio-page .mailbox code a {
          color: inherit;
          text-decoration: none;
        }
        .link-in-bio-page .mailbox button {
          flex: none;
          min-width: 84px;
          min-height: 44px;
          padding: 0 14px;
          border: 0;
          border-radius: 6px;
          cursor: pointer;
          background: var(--accent);
          color: var(--on-accent);
          font-family: var(--body);
          font-weight: 700;
          font-size: 0.9rem;
          transition: background-color .25s;
        }
        .link-in-bio-page .mailbox button:active {
          transform: translateY(1px);
        }

        /* Footer */
        .link-in-bio-page .foot {
          margin: 0;
          text-align: center;
          font-family: var(--mono);
          font-size: 0.72rem;
          line-height: 1.7;
          letter-spacing: 0.04em;
          color: var(--muted);
        }

        /* Entrance */
        .link-in-bio-page .rise {
          animation: rise .6s cubic-bezier(.2, .7, .2, 1) both;
          animation-delay: calc(var(--i, 0) * 55ms);
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .link-in-bio-page .rise { animation: none; }
          .link-in-bio-page .card,
          .link-in-bio-page .go svg,
          .link-in-bio-page .picker i {
            transition: none;
          }
        }
      `}</style>

      {/* Hidden SVG Sprite */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <symbol id="i-wa" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </symbol>
        <symbol id="i-li" viewBox="0 0 24 24">
          <g fill="currentColor">
            <circle cx="4.6" cy="4.6" r="2.2"/>
            <rect x="2.7" y="8.6" width="3.8" height="12.2"/>
            <path d="M9.2 8.6h3.6v1.7c.6-1.1 1.9-2 3.8-2 3.8 0 4.6 2.5 4.6 5.7v6.8h-3.8v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6.1H9.2Z"/>
          </g>
        </symbol>
        <symbol id="i-ig" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.2"/>
          <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.2"/>
          <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/>
        </symbol>
        <symbol id="i-pi" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
        </symbol>
        <symbol id="i-fg" viewBox="0 0 24 24">
          <g fill="currentColor">
            <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5Z"/>
            <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12Z"/>
            <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z"/>
            <circle cx="15.5" cy="12.5" r="3.5"/>
            <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0Z"/>
          </g>
        </symbol>
        <symbol id="i-be" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="M1.5 5.5h5.6c2.1 0 3.4 1 3.4 2.8 0 1.2-.6 2-1.6 2.4 1.4.3 2.2 1.3 2.2 2.7 0 2-1.5 3.1-3.8 3.1H1.5Zm2.4 1.8v2.4h2.6c.9 0 1.4-.4 1.4-1.2s-.5-1.2-1.4-1.2Zm0 4.2v2.8h2.9c1 0 1.6-.5 1.6-1.4s-.6-1.4-1.6-1.4Z"/>
          <rect x="14" y="5" width="6.6" height="1.7" fill="currentColor"/>
          <path d="M14.2 13h6.8c0-2-1.3-3.7-3.4-3.7S14.2 11 14.2 13.2s1.5 3.6 3.7 3.6c1.4 0 2.5-.6 3-1.7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </symbol>
      </svg>

      <main className="wrap">
        {/* Top bar */}
        <div className="bar rise" style={{ "--i": 0 } as React.CSSProperties}>
          <span>Navneet Patidar</span>
          <span>Links</span>
        </div>

        {/* Hero */}
        <header className="hero rise" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="frame-wrap">
            <div className="frame">
              <img
                src={PORTRAIT_SRC}
                width="176"
                height="220"
                alt="Illustrated portrait of Navneet Patidar"
              />
              <span className="h tl"></span>
              <span className="h tr"></span>
              <span className="h bl"></span>
              <span className="h br"></span>
            </div>
            <span className="size-tag">176 × 220</span>
            <span className="cursor" aria-hidden="true">
              <svg viewBox="0 0 18 18">
                <path d="M2 1.5 15 8l-5.6 1.6L7.6 15.5Z" strokeLinejoin="round"/>
              </svg>
              <span className="pill">Navneet</span>
            </span>
          </div>

          <div className="picker" role="group" aria-label="Accent colour">
            <h2>Accent</h2>
            <button
              type="button"
              data-mood="0"
              aria-pressed={mood === 0}
              onClick={() => setMood(0)}
              style={{ "--sw": "var(--a1)" } as React.CSSProperties}
            >
              <i></i>Teal
            </button>
            <button
              type="button"
              data-mood="1"
              aria-pressed={mood === 1}
              onClick={() => setMood(1)}
              style={{ "--sw": "var(--a2)" } as React.CSSProperties}
            >
              <i></i>Orange
            </button>
            <button
              type="button"
              data-mood="2"
              aria-pressed={mood === 2}
              onClick={() => setMood(2)}
              style={{ "--sw": "var(--a3)" } as React.CSSProperties}
            >
              <i></i>Ochre
            </button>
            <button
              type="button"
              data-mood="3"
              aria-pressed={mood === 3}
              onClick={() => setMood(3)}
              style={{ "--sw": "var(--a4)" } as React.CSSProperties}
            >
              <i></i>Indigo
            </button>
          </div>
        </header>

        {/* Intro */}
        <section className="intro rise" style={{ "--i": 2 } as React.CSSProperties}>
          <h1>
            <span>Navneet</span>
            <span className="two">Patidar</span>
          </h1>
          <p className="lede">
            Curious by nature, creative by instinct, and always chasing the <mark>“what if?”</mark>
          </p>
          <p className="lede second">
            Somewhere between imagination and reality, I’m figuring things out, breaking patterns, and creating my own kind of chaos.
          </p>
        </section>

        {/* Featured Section */}
        <section className="section rise" style={{ "--i": 3 } as React.CSSProperties}>
          <h2 className="eyebrow">Featured</h2>
          <a
            className="card feature"
            href="https://designbynavneet.vercel.app"
            target="_blank"
            rel="noopener"
            style={{ "--c": "#F2622B" } as React.CSSProperties}
          >
            <span className="chip">
              <b>Aa</b>
              <small>#F2622B</small>
            </span>
            <span className="txt">
              <strong>Portfolio</strong>
            </span>
            <span className="go" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 17 17 7M8 7h9v9"/>
              </svg>
            </span>
          </a>
        </section>

        {/* Social Links Section */}
        <section className="section rise" style={{ "--i": 4 } as React.CSSProperties}>
          <h2 className="eyebrow">Find me elsewhere</h2>
          <ul className="links">
            <li>
              <a
                className="card"
                href="https://api.whatsapp.com/send/?phone=917878913449&text=Hi+Navneet%2C+I+came+across+your+portfolio+and+wanted+to+reach+out.+I%E2%80%99d+love+to+discuss+something+with+you.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener"
                style={{ "--c": "#F7A03A" } as React.CSSProperties}
              >
                <span className="chip">
                  <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-wa"/>
                  </svg>
                  <small>#F7A03A</small>
                </span>
                <span className="txt">
                  <strong>WhatsApp</strong>
                  <span>Start a chat</span>
                </span>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                className="card"
                href="https://www.linkedin.com/in/navneet-patidar/"
                target="_blank"
                rel="noopener"
                style={{ "--c": "#7FC4D6" } as React.CSSProperties}
              >
                <span className="chip">
                  <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-li"/>
                  </svg>
                  <small>#7FC4D6</small>
                </span>
                <span className="txt">
                  <strong>LinkedIn</strong>
                  <span>navneet-patidar</span>
                </span>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                className="card"
                href="https://www.instagram.com/navneet.svg"
                target="_blank"
                rel="noopener"
                style={{ "--c": "#FFB48A" } as React.CSSProperties}
              >
                <span className="chip">
                  <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-ig"/>
                  </svg>
                  <small>#FFB48A</small>
                </span>
                <span className="txt">
                  <strong>Instagram</strong>
                  <span>@navneet.svg</span>
                </span>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                className="card"
                href="https://in.pinterest.com/navneet4svg/"
                target="_blank"
                rel="noopener"
                style={{ "--c": "#F2E3C4" } as React.CSSProperties}
              >
                <span className="chip">
                  <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-pi"/>
                  </svg>
                  <small>#F2E3C4</small>
                </span>
                <span className="txt">
                  <strong>Pinterest</strong>
                  <span>navneet4svg</span>
                </span>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                className="card"
                href="https://www.figma.com/@navneet4svg"
                target="_blank"
                rel="noopener"
                style={{ "--c": "#A9D9C8" } as React.CSSProperties}
              >
                <span className="chip">
                  <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-fg"/>
                  </svg>
                  <small>#A9D9C8</small>
                </span>
                <span className="txt">
                  <strong>Figma</strong>
                  <span>@navneet4svg</span>
                </span>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                className="card"
                href="https://www.behance.net/navneetpatidar"
                target="_blank"
                rel="noopener"
                style={{ "--c": "#B7BFF0" } as React.CSSProperties}
              >
                <span className="chip">
                  <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-be"/>
                  </svg>
                  <small>#B7BFF0</small>
                </span>
                <span className="txt">
                  <strong>Behance</strong>
                  <span>navneetpatidar</span>
                </span>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </section>

        {/* Mail Section */}
        <section className="section rise" style={{ "--i": 5 } as React.CSSProperties}>
          <h2 className="eyebrow">Mail</h2>
          <div className="mailbox">
            <code id="mail" ref={mailRef}>
              <a href="mailto:designer.navneet.patidar@gmail.com">designer.navneet.patidar@gmail.com</a>
            </code>
            <button id="copy" type="button" aria-live="polite" onClick={handleCopy}>
              {copyLabel}
            </button>
          </div>
        </section>

        {/* Footer */}
        <p className="foot rise" style={{ "--i": 6 } as React.CSSProperties}>
          Crafted by Navneet with Love
        </p>
      </main>
    </div>
  );
};
