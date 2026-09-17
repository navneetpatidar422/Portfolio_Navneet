import { motion, HTMLMotionProps } from "motion/react";
import React from "react";

export interface StaggeredTextProps extends Omit<HTMLMotionProps<"h2">, "children"> {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  type?: "words" | "chars";
  delay?: number;
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  className = "",
  as: Component = "h2",
  staggerDelay = 0.045,
  duration = 0.5,
  once = true,
  type = "words",
  delay = 0.2,
  ...props
}) => {
  // Split by words or characters
  const items = type === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const MotionComponent = motion[Component] as any;

  return (
    <MotionComponent
      className={`inline-block overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      {...props}
    >
      {type === "words" ? (
        items.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block mr-[0.28em] whitespace-nowrap will-change-transform"
          >
            {word}
          </motion.span>
        ))
      ) : (
        items.map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block whitespace-pre will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      )}
    </MotionComponent>
  );
};
