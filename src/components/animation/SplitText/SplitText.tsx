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
}

export default function SplitText({
  children,
  delay = 0,
  stagger = 0.08,
  duration = 0.8,
  ...props
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const lines = children.split("\n");

  return (
    <motion.div className={styles.wrapper} {...props}>
      {lines.map((line, index) => (
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
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    y: "0%",
                    opacity: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}