"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";

import styles from "./Header.module.css";

const LABS = ["l", "a", "b", "s"];

interface BrandLetterProps {
  letter: string;
  index: number;
  progress: MotionValue<number>;
}

function BrandLetter({
  letter,
  index,
  progress,
}: BrandLetterProps) {
  const start = index * 0.1;
  const end = start + 0.3;

  const y = useTransform(
    progress,
    [start, end],
    [0, 90],
  );

  const opacity = useTransform(
    progress,
    [start, start + 0.12, end],
    [1, 1, 0],
  );

  return (
    <motion.span
      className={styles.brandLetter}
      style={{
        y,
        opacity,
      }}
    >
      {letter}
    </motion.span>
  );
}

export default function Header() {
  const scroll = useMotionValue(0);

  useLenis((lenis) => {
    scroll.set(lenis.scroll);
  });

  const progress = useTransform(
    scroll,
    [0, 180],
    [0, 1],
  );

  const smoothProgress = useSpring(progress, {
    stiffness: 220,
    damping: 30,
    mass: 0.6,
  });

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="O(n) labs"
        >
          <span className={styles.brand}>
            <span className={styles.brandCore}>
              O(n)
            </span>

            <span className={styles.brandLabs}>
              {LABS.map((letter, index) => (
                <BrandLetter
                  key={`${letter}-${index}`}
                  letter={letter}
                  index={index}
                  progress={smoothProgress}
                />
              ))}
            </span>
          </span>
        </Link>

        <nav
          className={styles.nav}
          aria-label="Основная навигация"
        >
          <Link
            href="/cases"
            className={styles.navLink}
          >
            Кейсы
          </Link>

          <Link
            href="/services"
            className={styles.navLink}
          >
            Услуги
          </Link>

          <Link
            href="/contacts"
            className={styles.contactLink}
          >
            <span className={styles.liquid} />

            <span className={styles.contactText}>
              Обсудить проект
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              className={styles.ctaIcon}
              aria-hidden="true"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}