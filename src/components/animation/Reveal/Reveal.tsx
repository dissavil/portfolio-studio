"use client";

import {
  motion,
  type HTMLMotionProps,
  useReducedMotion,
} from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}