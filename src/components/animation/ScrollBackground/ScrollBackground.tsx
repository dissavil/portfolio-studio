"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValue, useTransform } from "motion/react";

import styles from "./ScrollBackground.module.css";

export default function ScrollBackground() {
  const scroll = useMotionValue(0);

  useLenis((lenis) => {
    scroll.set(lenis.scroll);
  });

  const rotate = useTransform(
    scroll,
    [0, 2000],
    [0, 360]
  );

  const x = useTransform(
    scroll,
    [0, 2000],
    [0, 500]
  );

  const y = useTransform(
    scroll,
    [0, 2000],
    [0, 600]
  );

  const scale = useTransform(
    scroll,
    [0, 2000],
    [1, 1.5]
  );

  const secondaryRotate = useTransform(
    scroll,
    [0, 2000],
    [0, -300]
  );

  const secondaryX = useTransform(
    scroll,
    [0, 2000],
    [0, -400]
  );

  return (
    <div className={styles.background}>
      <motion.div
        className={styles.orb}
        style={{
          rotate,
          x,
          y,
          scale,
        }}
      />

      <motion.div
        className={styles.orbSecondary}
        style={{
          rotate: secondaryRotate,
          x: secondaryX,
        }}
      />
    </div>
  );
}