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
  trigger?: "view" | "mount";
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  trigger = "view",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const hidden = {
    opacity: 0,
    y,
  };

  const visible = {
    opacity: 1,
    y: 0,
  };

  if (shouldReduceMotion) {
    return (
      <motion.div {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      {...(trigger === "mount"
        ? {
            animate: visible,
          }
        : {
            whileInView: visible,
            viewport: {
              once: true,
              amount: 0.15,
            },
          })}
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