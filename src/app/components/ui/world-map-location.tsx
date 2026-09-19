import React from "react";
import { motion } from "motion/react";
import { WorldMapSvg } from "./world-map-svg";

interface WorldMapLocationProps {
  className?: string;
  badgeText?: string;
}

export const WorldMapLocation: React.FC<WorldMapLocationProps> = ({
  className = "",
  badgeText = "I am here",
}) => {
  return (
    <div className={`relative w-full max-w-[540px] select-none ${className}`}>
      {/* 3D Perspective Stage */}
      <div 
        className="relative w-full aspect-[2000/1000] flex items-center justify-center overflow-visible"
        style={{ perspective: "1000px" }}
      >
        {/* Tilted Ground Plane Map */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(52deg) rotateZ(-4deg) scale(1.02)",
          }}
        >
          {/* Ambient Ground Radial Glow under India */}
          <div 
            className="absolute z-0 pointer-events-none rounded-full blur-2xl"
            style={{
              left: "72.25%",
              top: "43.5%",
              width: "180px",
              height: "180px",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(16,185,129,0.12) 45%, transparent 70%)",
            }}
          />

          {/* SVG Map Component with dynamic light/dark styling & India accent */}
          <div 
            className="relative w-full h-full text-neutral-300 dark:text-neutral-700/80 [&_#IN]:fill-sky-400/80 [&_#IN]:dark:fill-sky-500/80 [&_#IN]:stroke-sky-500 drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-colors duration-500"
            style={{
              maskImage: "radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)",
            }}
          >
            <WorldMapSvg className="w-full h-full object-contain" />
          </div>

          {/* Location Anchor Point on India (x: 72.25%, y: 43.5%) */}
          <div
            className="absolute z-20"
            style={{
              left: "72.25%",
              top: "43.5%",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ground Radar Pulse (In map plane) */}
            <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
              {/* Radar Wave 1 */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0.95 }}
                animate={{ scale: [0.2, 2.8, 3.8], opacity: [0.95, 0.4, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-12 h-12 rounded-full border border-sky-400/90 dark:border-sky-400 bg-sky-400/15 shadow-[0_0_15px_rgba(56,189,248,0.6)] pointer-events-none"
              />

              {/* Radar Wave 2 */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0.95 }}
                animate={{ scale: [0.2, 2.4, 3.4], opacity: [0.95, 0.35, 0] }}
                transition={{
                  duration: 2.5,
                  delay: 0.85,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-12 h-12 rounded-full border border-sky-400/60 dark:border-sky-400/70 bg-sky-400/5 pointer-events-none"
              />

              {/* Base Glowing Dot */}
              <div className="w-3.5 h-3.5 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_10px_#38bdf8] ring-2 ring-sky-300/50" />
            </div>

            {/* Vertical 3D Column standing straight up */}
            <div
              className="absolute bottom-0 left-0 flex flex-col items-center pointer-events-auto"
              style={{
                transform: "translate(-50%, 0) rotateZ(4deg) rotateX(-52deg)",
                transformOrigin: "bottom center",
              }}
            >
              {/* Floating Tooltip Pill Badge */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                {/* Live pulsing green/cyan indicator dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>

                {/* Badge text */}
                <span className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight whitespace-nowrap">
                  {badgeText}
                </span>

                {/* Bottom connector glow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-sky-400/90 blur-[1px]" />
              </motion.div>

              {/* Vertical Glowing Cyan/Blue Beam */}
              <div className="relative w-[2px] h-14 md:h-16 flex flex-col items-center">
                {/* Core Laser Line */}
                <div 
                  className="w-full h-full bg-gradient-to-t from-sky-500 via-sky-400 to-sky-300 shadow-[0_0_10px_#38bdf8]" 
                />
                
                {/* Outer Glow Halo */}
                <div 
                  className="absolute inset-y-0 -left-1.5 -right-1.5 bg-gradient-to-t from-sky-500/50 via-sky-400/25 to-transparent blur-[3px]" 
                />

                {/* Animated Light Packet traveling along the beam */}
                <motion.div
                  animate={{
                    top: ["0%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-1.5 h-4 bg-white rounded-full blur-[0.5px] -left-[2px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
