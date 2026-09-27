"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";

import styles from "./SplitText.module.css";

interface SplitTextProps extends HTMLMotionProps<"div"> {
  children: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  trigger?: "view" | "mount";
  as?: "div" | "h1";
}

export default function SplitText({
  children,
  delay = 0,
  stagger = 0.08,
  duration = 0.8,
  trigger = "view",
  as = "div",
  ...props
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const lines = children
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const content = lines.map((line, index) => (
    <span
      key={`${line}-${index}`}
      className={styles.line}
    >
      <motion.span
        className={styles.inner}
        initial={
          shouldReduceMotion
            ? false
            : {
                y: "110%",
                opacity: 0,
              }
        }
        {...(shouldReduceMotion
          ? {}
          : trigger === "mount"
            ? {
                animate: {
                  y: "0%",
                  opacity: 1,
                },
              }
            : {
                whileInView: {
                  y: "0%",
                  opacity: 1,
                },
                viewport: {
                  once: true,
                  amount: 0.2,
                },
              })}
        transition={{
          duration,
          delay: delay + index * stagger,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {line}
      </motion.span>
    </span>
  ));

  if (as === "h1") {
    return (
      <motion.h1 className={styles.wrapper} {...props}>
        {content}
      </motion.h1>
    );
  }

  return (
    <motion.div className={styles.wrapper} {...props}>
      {content}
    </motion.div>
  );
}
