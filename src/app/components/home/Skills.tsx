import { useState, useEffect } from "react";
import { motion } from "motion/react";

const cardsData = [
  {
    id: "ui-ux",
    title: "UI/UX DESIGN",
    subtitle: "Aesthetic Interfaces & Layouts",
    gradient: "from-purple-600 to-indigo-800",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    details: ["Visual Hierarchy", "Typography & Colors", "Responsive Layouts", "Grid Systems", "Mockups & Wireframes"]
  },
  {
    id: "product-thinking",
    title: "PRODUCT THINKING",
    subtitle: "User-Centered Strategy",
    gradient: "from-blue-600 to-sky-800",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    details: ["User Personas", "Journey Mapping", "Problem Framing", "Feature Prioritization", "MVP Definitions"]
  },
  {
    id: "interaction",
    title: "INTERACTION DESIGN",
    subtitle: "Dynamic Human Interfaces",
    gradient: "from-slate-900 to-indigo-950",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    ),
    details: ["Micro-interactions", "User Flows & Nav", "Interactive States", "Animation Systems", "Framer Prototyping"]
  },
  {
    id: "design-systems",
    title: "DESIGN SYSTEMS",
    subtitle: "Scalable Library Architectures",
    gradient: "from-teal-600 to-emerald-800",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    details: ["Figma Component Libs", "Tokens & Variables", "Documentation", "Auto-Layout & Variants", "Cross-functional Handoff"]
  },
  {
    id: "prototyping",
    title: "PROTOTYPING & MOTION",
    subtitle: "High-Fidelity Code & Design",
    gradient: "from-rose-600 to-orange-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    details: ["High-Fidelity Flows", "Motion Transitions", "Usability Testing", "Framer Code Injections", "Lottie Animations"]
  }
];

const toolsData = [
  {
    name: "Figma",
    brandColorClass: "group-hover:text-[#F24E1E] group-hover:border-[#F24E1E]/40",
    bgColorClass: "group-hover:bg-[#F24E1E]/[0.03]",
    logoBgClass: "group-hover:bg-[#F24E1E]/10 group-hover:border-[#F24E1E]/20",
    logo: (
      <svg className="w-6 h-9 shrink-0 select-none" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 346 512.36">
        <g fillRule="nonzero">
          <path fill="#00B6FF" d="M172.53 246.9c0-42.04 34.09-76.11 76.12-76.11h11.01c.3.01.63-.01.94-.01 47.16 0 85.4 38.25 85.4 85.4 0 47.15-38.24 85.39-85.4 85.39-.31 0-.64-.01-.95-.01l-11 .01c-42.03 0-76.12-34.09-76.12-76.12V246.9z"/>
          <path fill="#24CB71" d="M0 426.98c0-47.16 38.24-85.41 85.4-85.41l87.13.01v84.52c0 47.65-39.06 86.26-86.71 86.26C38.67 512.36 0 474.13 0 426.98z"/>
          <path fill="#FF7237" d="M172.53.01v170.78h87.13c.3-.01.63.01.94.01 47.16 0 85.4-38.25 85.4-85.4C346 38.24 307.76 0 260.6 0c-.31 0-.64.01-.95.01h-87.12z"/>
          <path fill="#FF3737" d="M0 85.39c0 47.16 38.24 85.4 85.4 85.4h87.13V.01H85.39C38.24.01 0 38.24 0 85.39z"/>
          <path fill="#874FFF" d="M0 256.18c0 47.16 38.24 85.4 85.4 85.4h87.13V170.8H85.39C38.24 170.8 0 209.03 0 256.18z"/>
        </g>
      </svg>
    )
  },
  {
    name: "Canva",
    brandColorClass: "group-hover:text-[#7D2AE8] group-hover:border-[#7D2AE8]/40",
    bgColorClass: "group-hover:bg-[#7D2AE8]/[0.03]",
    logoBgClass: "group-hover:bg-[#7D2AE8]/10 group-hover:border-[#7D2AE8]/20",
    logo: (
      <svg className="w-8 h-8 shrink-0 select-none" viewBox="0 0 508 508" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit={2}>
        <g transform="matrix(.26718 0 0 .26718 0 0)">
          <circle cx={950} cy={950} r={950} fill="#7d2ae7"/>
          <circle cx={950} cy={950} r={950} fill="url(#prefix___Radial1)"/>
          <circle cx={950} cy={950} r={950} fill="url(#prefix___Radial2)"/>
          <circle cx={950} cy={950} r={950} fill="url(#prefix___Radial3)"/>
          <circle cx={950} cy={950} r={950} fill="url(#prefix___Radial4)"/>
        </g>
        <path d="M446.744 276.845c-.665 0-1.271.43-1.584 1.33-4.011 11.446-9.43 18.254-13.891 18.254-2.563 0-3.6-2.856-3.6-7.336 0-11.21 6.71-34.982 10.095-45.82.392-1.312.646-2.485.646-3.483 0-3.15-1.722-4.696-5.987-4.696-4.598 0-9.547 1.8-14.36 10.233-1.663-7.435-6.691-10.683-13.715-10.683-8.12 0-15.965 5.224-22.421 13.696-6.456 8.471-14.048 11.25-19.76 9.88 4.108-10.057 5.634-17.57 5.634-23.145 0-8.746-4.324-14.028-11.308-14.028-10.624 0-16.747 10.134-16.747 20.797 0 8.237 3.736 16.708 11.954 20.817-6.887 15.573-16.943 29.66-20.758 29.66-4.93 0-6.379-24.123-6.105-41.38.176-9.9.998-10.408.998-13.401 0-1.722-1.115-2.896-5.595-2.896-10.448 0-13.676 8.844-14.165 18.998a50.052 50.052 0 01-1.8 11.406c-4.363 15.573-13.363 27.39-19.232 27.39-2.72 0-3.463-2.72-3.463-6.28 0-11.21 6.28-25.219 6.28-37.173 0-8.784-3.854-14.34-11.112-14.34-8.55 0-19.858 10.173-30.56 29.229 3.521-14.595 4.97-28.721-5.459-28.721a14.115 14.115 0 00-6.476 1.683 3.689 3.689 0 00-2.113 3.56c.998 15.535-12.521 55.329-25.336 55.329-2.328 0-3.463-2.524-3.463-6.593 0-11.23 6.691-34.943 10.056-45.801.43-1.409.666-2.622.666-3.678 0-2.974-1.84-4.5-6.007-4.5-4.578 0-9.547 1.741-14.34 10.174-1.683-7.435-6.711-10.683-13.735-10.683-11.523 0-24.397 12.19-30.051 28.076-7.572 21.208-22.832 41.692-43.375 41.692-18.645 0-28.486-15.515-28.486-40.03 0-35.392 25.982-64.308 45.253-64.308 9.215 0 13.617 5.869 13.617 14.869 0 10.897-6.085 15.964-6.085 20.112 0 1.272 1.057 2.524 3.15 2.524 8.374 0 18.234-9.841 18.234-23.262 0-13.422-10.897-23.243-30.168-23.243-31.851 0-63.898 32.047-63.898 73.113 0 32.673 16.121 52.374 44 52.374 19.017 0 35.628-14.79 44.588-32.047 1.018 14.302 7.513 21.776 17.413 21.776 8.804 0 15.925-5.243 21.364-14.458 2.094 9.645 7.65 14.36 14.87 14.36 8.275 0 15.201-5.243 21.794-14.986-.097 7.65 1.644 14.85 8.276 14.85 3.13 0 6.867-.725 7.533-3.464 6.984-28.877 24.24-52.453 29.523-52.453 1.565 0 1.995 1.507 1.995 3.287 0 7.846-5.537 23.928-5.537 34.2 0 11.092 4.716 18.43 14.459 18.43 10.8 0 21.775-13.227 29.092-32.556 2.29 18.058 7.24 32.633 14.987 32.633 9.508 0 26.392-20.014 36.625-41.203 4.01.509 10.036.372 15.827-3.717-2.465 6.241-3.912 13.07-3.912 19.897 0 19.663 9.39 25.18 17.47 25.18 8.785 0 15.907-5.243 21.365-14.458 1.8 8.315 6.398 14.34 14.85 14.34 13.225 0 24.71-13.519 24.71-24.612 0-2.934-1.252-4.715-2.72-4.715zm-274.51 18.547c-5.342 0-7.435-5.38-7.435-13.401 0-13.93 9.528-37.193 19.604-37.193 4.402 0 6.065 5.185 6.065 11.524 0 14.145-9.059 39.07-18.235 39.07zm182.948-41.574c-3.189-3.796-4.343-8.961-4.343-13.559 0-5.673 2.074-10.467 4.558-10.467 2.485 0 3.248 2.446 3.248 5.85 0 5.693-2.035 14.008-3.463 18.176zm41.418 41.574c-5.34 0-7.434-6.182-7.434-13.401 0-13.441 9.528-37.193 19.682-37.193 4.402 0 5.967 5.146 5.967 11.524 0 14.145-8.902 39.07-18.215 39.07z" fill="#fff" fillRule="nonzero"/>
        <defs>
          <radialGradient id="prefix___Radial1" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="scale(1469.491) rotate(-49.416 1.37 .302)"><stop offset={0} stopColor="#6420ff"/><stop offset={1} stopColor="#6420ff" stopOpacity={0}/></radialGradient>
          <radialGradient id="prefix___Radial2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="rotate(54.703 42.717 594.194) scale(1657.122)"><stop offset={0} stopColor="#00c4cc"/><stop offset={1} stopColor="#00c4cc" stopOpacity={0}/></radialGradient>
          <radialGradient id="prefix___Radial3" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(1023 -1030 473.711 470.491 367 1684)"><stop offset={0} stopColor="#6420ff"/><stop offset={1} stopColor="#6420ff" stopOpacity={0}/></radialGradient>
          <radialGradient id="prefix___Radial4" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(595.999 1372 -2298.41 998.431 777 256)"><stop offset={0} stopColor="#00c4cc" stopOpacity={.73}/><stop offset={0} stopColor="#00c4cc"/><stop offset={1} stopColor="#00c4cc" stopOpacity={0}/></radialGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "Framer",
    brandColorClass: "group-hover:text-[#00C2FF] group-hover:border-[#00C2FF]/40",
    bgColorClass: "group-hover:bg-[#00C2FF]/[0.02] dark:group-hover:bg-[#00C2FF]/[0.04]",
    logoBgClass: "group-hover:bg-[#00C2FF]/10 group-hover:border-[#00C2FF]/20",
    logo: (
      <svg className="w-5 h-8 text-black dark:text-white transition-colors shrink-0 select-none" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 341 511.492">
        <path fillRule="nonzero" d="M170.5 340.995v170.497L0 340.992V170.5h170.5L0 0h341v170.5H170.5L341 340.999z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: "MS Designer",
    brandColorClass: "group-hover:text-[#FC2C78] group-hover:border-[#FC2C78]/40",
    bgColorClass: "group-hover:bg-[#FC2C78]/[0.02]",
    logoBgClass: "group-hover:bg-[#FC2C78]/10 group-hover:border-[#FC2C78]/20",
    logo: (
      <img 
        className="w-8 h-8 shrink-0 select-none object-contain" 
        src="https://res.public.onecdn.static.microsoft/designer/client/prod/static/media/designer-app-logo.c270ec3147032a913024e7fa63cff2aa.svg" 
        alt="Microsoft Designer"
        loading="lazy"
      />
    )
  },
  {
    name: "Adobe XD",
    brandColorClass: "group-hover:text-[#FF61F6] group-hover:border-[#FF61F6]/40",
    bgColorClass: "group-hover:bg-[#FF61F6]/[0.02]",
    logoBgClass: "group-hover:bg-[#FF61F6]/10 group-hover:border-[#FF61F6]/20",
    logo: (
      <svg className="w-8 h-8 shrink-0 select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM15.762 16.776C14.8881 16.8112 14.038 16.4858 13.411 15.876C12.7614 15.1354 12.4282 14.1696 12.483 13.186C12.4629 12.23 12.8039 11.3017 13.438 10.586C14.1085 9.87714 15.0497 9.48822 16.025 9.517C16.116 9.517 16.187 9.517 16.258 9.517V7.517C16.258 7.36054 16.3845 7.23355 16.541 7.233H17.858C17.9311 7.23027 18.0026 7.25527 18.058 7.303C18.1127 7.35483 18.1426 7.42766 18.14 7.503V15.182C18.1353 15.4469 18.1486 15.7119 18.18 15.975V15.989V16C18.1815 16.0636 18.1618 16.1259 18.124 16.177C18.0913 16.2171 18.05 16.2493 18.003 16.271C17.309 16.6023 16.55 16.7751 15.781 16.777L15.762 16.776ZM14.846 11.66L14.841 11.666C14.5243 12.0828 14.3649 12.5981 14.391 13.121C14.3499 13.6658 14.5073 14.2071 14.834 14.645C15.1012 14.9392 15.486 15.0985 15.883 15.079C16.009 15.0806 16.1348 15.0679 16.258 15.041V11.192C16.1647 11.172 16.0694 11.1623 15.974 11.163C15.5419 11.1514 15.1276 11.3351 14.846 11.663V11.66ZM12.225 16.66H10.774C10.6211 16.67 10.4787 16.5815 10.42 16.44L10.21 16L10.205 15.989L10 15.58L9.936 15.447C9.617 14.789 9.288 14.111 8.958 13.413C8.499 14.43 8.009 15.478 7.541 16.444V16.454L7.536 16.463C7.50253 16.5191 7.45584 16.5661 7.4 16.6C7.34323 16.6339 7.27811 16.6512 7.212 16.65H5.841C5.72319 16.6558 5.61584 16.5827 5.578 16.471C5.5536 16.3871 5.56948 16.2966 5.621 16.226L7.85 11.965L5.694 7.651C5.6348 7.56534 5.63013 7.45328 5.682 7.363C5.7317 7.28139 5.82045 7.23171 5.916 7.232H7.35C7.41966 7.22828 7.48897 7.24422 7.55 7.278C7.6119 7.31604 7.65966 7.37328 7.686 7.441C8.222 8.566 8.674 9.541 9.069 10.406C9.56 9.306 10.082 8.188 10.432 7.447L10.437 7.436L10.443 7.426V7.42V7.415C10.4681 7.37222 10.4994 7.33345 10.536 7.3C10.5979 7.24836 10.6764 7.22099 10.757 7.223H12.1C12.2049 7.2202 12.3017 7.27935 12.347 7.374C12.3828 7.46015 12.3743 7.55838 12.324 7.637L10.167 11.824L12.449 16.224C12.4976 16.3014 12.5083 16.3968 12.478 16.483C12.4394 16.5891 12.3379 16.6593 12.225 16.658V16.66Z" fill="#FF61F6"/>
      </svg>
    )
  },
  {
    name: "HTML",
    brandColorClass: "group-hover:text-[#E44D26] group-hover:border-[#E44D26]/40",
    bgColorClass: "group-hover:bg-[#E44D26]/[0.02]",
    logoBgClass: "group-hover:bg-[#E44D26]/10 group-hover:border-[#E44D26]/20",
    logo: (
      <svg className="w-8 h-8 shrink-0 select-none" viewBox="0 0 108.35 122.88" xmlns="http://www.w3.org/2000/svg">
        <polygon fill="#E44D26" points="108.35,0 98.48,110.58 54.11,122.88 9.86,110.6 0,0 108.35,0"/>
        <polygon fill="#F16529" points="54.17,113.48 90.03,103.54 98.46,9.04 54.17,9.04 54.17,113.48"/>
        <path fill="#EBEBEB" d="M34.99,36.17h19.19V22.61H20.16l0.32,3.64l3.33,37.38h30.35V50.06H36.23L34.99,36.17z M38.04,70.41H24.43l1.9,21.3l27.79,7.71l0.06-0.02V85.29l-0.06,0.02l-15.11-4.08L38.04,70.41z"/>
        <path fill="#FFFFFF" d="M54.13,63.63h16.7l-1.57,17.59L54.13,85.3v14.11l27.81-7.71l0.2-2.29l3.19-35.71l0.33-3.64H54.13V63.63z M54.13,36.14v0.03h32.76l0.27-3.05l0.62-6.88l0.32-3.64H54.13V36.14z"/>
      </svg>
    )
  },
  {
    name: "CSS",
    brandColorClass: "group-hover:text-[#2062af] group-hover:border-[#2062af]/40",
    bgColorClass: "group-hover:bg-[#2062af]/[0.02]",
    logoBgClass: "group-hover:bg-[#2062af]/10 group-hover:border-[#2062af]/20",
    logo: (
      <svg className="w-8 h-8 shrink-0 select-none" viewBox="0 0 296297 333333" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit={2} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality">
        <defs>
          <linearGradient id="id4" gradientUnits="userSpaceOnUse" x1={54128.7} y1={79355.5} x2={240318} y2={79355.5}><stop offset={0} stopColor="#e8e7e5"/><stop offset={1} stopColor="#fff"/></linearGradient>
          <linearGradient id="id5" gradientUnits="userSpaceOnUse" x1={62019.3} y1={202868} x2={233515} y2={202868}><stop offset={0} stopColor="#e8e7e5"/><stop offset={1} stopColor="#fff"/></linearGradient>
          <linearGradient id="id6" gradientUnits="userSpaceOnUse" x1={104963} y1={99616.9} x2={104963} y2={171021}><stop offset={0} stopColor="#d1d3d4"/><stop offset={.388} stopColor="#d1d3d4"/><stop offset={1} stopColor="#d1d3d4"/></linearGradient>
          <linearGradient id="id7" gradientUnits="userSpaceOnUse" x1={194179} y1={61185.8} x2={194179} y2={135407}><stop offset={0} stopColor="#d1d3d4"/><stop offset={.388} stopColor="#d1d3d4"/><stop offset={1} stopColor="#d1d3d4"/></linearGradient>
          <mask id="id0"><linearGradient id="id1" gradientUnits="userSpaceOnUse" x1={104963} y1={99616.9} x2={104963} y2={171021}><stop offset={0} stopOpacity={0} stopColor="#fff"/><stop offset={.388} stopColor="#fff"/><stop offset={1} stopOpacity={.831} stopColor="#fff"/></linearGradient><path fill="url(#id1)" d="M61737 99467h86453v71704H61737z"/></mask>
          <mask id="id2"><linearGradient id="id3" gradientUnits="userSpaceOnUse" x1={194179} y1={61185.8} x2={194179} y2={135407}><stop offset={0} stopOpacity={0} stopColor="#fff"/><stop offset={.388} stopColor="#fff"/><stop offset={1} stopOpacity={.831} stopColor="#fff"/></linearGradient><path fill="url(#id3)" d="M147890 61036h92578v74521h-92578z"/></mask>
        </defs>
        <g id="Layer_x0020_1">
          <g id="_513085304">
            <path fill="#2062af" d="M268517 300922l-120369 32411-120371-32411L0 0h296297z"/>
            <path fill="#3c9cd7" d="M148146 24374v283109l273 74 97409-26229 22485-256954z"/>
            <path fill="#fff" d="M148040 99617l-86153 35880 2857 35524 83296-35614 88604-37883 3674-36339-92278 38432z"/>
            <path mask="url(#id0)" fill="url(#id6)" d="M61887 135497l2857 35524 83295-35614V99617z"/>
            <path mask="url(#id2)" fill="url(#id7)" d="M240318 61186l-92278 38431v35790l88604-37883z"/>
            <path fill="url(#id5)" d="M62019 135497l2858 35524 127806 407-2859 47365-42055 11840-40428-10208-2450-29399H67327l4900 56756 75950 22457 75538-22050 9800-112692z"/>
            <path fill="#000" fillOpacity={0.05098} d="M148040 135497H61888l2857 35524 83295 266v-35790zm0 95022l-408 114-40422-10208-2450-29399H67197l4899 56756 75944 22457v-39720z"/>
            <path fill="url(#id4)" d="M54129 61186h186189l-3674 36339H58620l-4491-36339z"/>
            <path fill="#000" fillOpacity={0.05098} d="M148040 61186H54129l4491 36339h89420z"/>
          </g>
        </g>
      </svg>
    )
  }
];

export const Skills = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredDeck, setHoveredDeck] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = (i: number) => {
    const relativeIndex = (i - activeIdx + cardsData.length) % cardsData.length;
    if (relativeIndex === 0) {
      // Cycle to the next card
      setActiveIdx((prev) => (prev + 1) % cardsData.length);
    }
  };

  return (
    <section id="skills" className="py-24 lg:py-32 px-6 bg-transparent text-foreground relative overflow-hidden transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 w-[400px] md:w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] md:w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left Column: 3D Stack of Cards */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[380px] md:min-h-[460px]">
          
          <div 
            className="relative w-full max-w-[320px] md:max-w-[380px] h-[220px] md:h-[260px] flex items-center justify-center [perspective:1200px]"
            onMouseEnter={() => setHoveredDeck(true)}
            onMouseLeave={() => setHoveredDeck(false)}
          >
            {cardsData.map((card, i) => {
              const relativeIndex = (i - activeIdx + cardsData.length) % cardsData.length;
              const isFront = relativeIndex === 0;

              // Step coordinates for stacked layers (angled cascade)
              const xStep = isMobile ? 14 : 28;
              const xHoverStep = isMobile ? 22 : 44;
              const yStep = isMobile ? -8 : -16;
              const zStep = isMobile ? -24 : -40;

              // STACKING ORDER FIX: Front-most card relativeIndex === 0 gets highest z-index.
              const calculatedZIndex = 50 - relativeIndex * 10;

              return (
                <motion.div
                  key={card.id}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    zIndex: calculatedZIndex
                  }}
                  animate={{
                    x: isFront 
                      ? (hoveredCard === i ? -24 : 0) 
                      : (hoveredDeck ? relativeIndex * xHoverStep : relativeIndex * xStep),
                    y: isFront 
                      ? (hoveredCard === i ? -18 : 0) 
                      : (relativeIndex * yStep),
                    z: isFront ? 40 : (relativeIndex * zStep),
                    scale: isFront ? 1.03 : (1 - relativeIndex * 0.06),
                    rotateX: isFront && hoveredCard === i ? 6 : 14,
                    rotateY: isFront && hoveredCard === i ? -14 : -24,
                    rotateZ: isFront && hoveredCard === i ? 4 : 10,
                    opacity: isFront ? 1 : Math.max(0.15, 0.85 - relativeIndex * 0.18),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  onClick={() => handleCardClick(i)}
                  onMouseEnter={() => isFront && setHoveredCard(i)}
                  onMouseLeave={() => isFront && setHoveredCard(null)}
                  className={`absolute w-full h-full rounded-[1.75rem] p-6 text-white shadow-2xl bg-gradient-to-br ${card.gradient} border border-white/20 select-none cursor-pointer flex flex-col justify-between overflow-hidden`}
                >
                  {/* Sheen effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />

                  {/* Top Section */}
                  <div className="flex items-start justify-between relative z-10 w-full">
                    <div>
                      {/* TEXT COLLISION FIX: Only render text contents on the active front card */}
                      {isFront ? (
                        <>
                          <h4 className="font-display font-bold text-base md:text-lg tracking-wider">
                            {card.title}
                          </h4>
                          <p className="text-[10px] md:text-xs text-white/70 font-medium">
                            {card.subtitle}
                          </p>
                        </>
                      ) : (
                        <div className="h-6" /> // Placeholder spacing
                      )}
                    </div>
                    
                    {/* Icon Badge */}
                    <div className="w-10 h-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-md">
                      {card.icon}
                    </div>
                  </div>

                  {/* Middle / Bottom Content */}
                  <div className="relative z-10 mt-4 flex-1 flex flex-col justify-end w-full">
                    {/* TEXT COLLISION FIX: Only render text/details on the front card */}
                    {isFront ? (
                      <div className="space-y-2 animate-[fadeIn_0.4s_ease-out]">
                        <p className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
                          Core Competencies
                        </p>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          {card.details.map((detail, idx) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 + 0.1 }}
                              className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/90"
                            >
                              <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                              <span className="truncate">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Minimal placeholder lines to mimic mock state - exactly like inspiration image */
                      <div className="space-y-2 opacity-30 mt-6">
                        <div className="h-2 bg-white/30 rounded-full w-20" />
                        <div className="h-2 bg-white/30 rounded-full w-32" />
                        <div className="h-2 bg-white/30 rounded-full w-24" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Creative Animated Text Content & Tools Grid */}
        <div className="lg:col-span-7 flex flex-col space-y-12 max-w-xl lg:max-w-none mx-auto lg:mx-0 w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-[1.1] text-neutral-900 dark:text-white tracking-tight transition-colors duration-500">
              Great products don't start with beautiful interfaces.
            </h2>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed transition-colors duration-500">
              They start with <span className="text-purple-600 dark:text-purple-400 font-medium">understanding people</span>, questioning assumptions, and designing systems that scale.
            </p>
          </motion.div>

          {/* Tools Showcase Section */}
          <div className="space-y-6">
            <h3 className="text-xs md:text-sm font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase">
              Tools &amp; Ecosystem I Use
            </h3>

            {/* Compact Logo + Name Grid with Custom Brand Hover Animations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {toolsData.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: i * 0.04,
                    layout: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  viewport={{ once: true }}
                  className={`group relative p-3 bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-900 rounded-2xl flex items-center gap-3.5 transition-all duration-300 shadow-sm ${tool.brandColorClass} ${tool.bgColorClass}`}
                >
                  {/* Logo Container */}
                  <div className={`w-11 h-11 flex items-center justify-center p-1.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shrink-0 group-hover:scale-108 group-hover:rotate-3 transition-all duration-300 ${tool.logoBgClass}`}>
                    {tool.logo}
                  </div>

                  {/* Info (Only Name, no description) */}
                  <span className="font-bold text-neutral-800 dark:text-neutral-100 text-sm tracking-wide transition-colors duration-300 truncate">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
