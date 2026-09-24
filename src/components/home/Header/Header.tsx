"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";

import styles from "./Header.module.css";

const LABS = ["l", "a", "b", "s"];

const NAV = [
  { href: "/cases", label: "Кейсы" },
  { href: "/services", label: "Услуги" },
];

interface BrandLetterProps {
  letter: string;
  index: number;
  progress: MotionValue<number>;
}

function BrandLetter({ letter, index, progress }: BrandLetterProps) {
  const start = index * 0.1;
  const end = start + 0.3;

  const y = useTransform(progress, [start, end], [0, 90]);

  const opacity = useTransform(
    progress,
    [start, start + 0.12, end],
    [1, 1, 0],
  );

  return (
    <motion.span className={styles.brandLetter} style={{ y, opacity }}>
      {letter}
    </motion.span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const scroll = useMotionValue(0);
  const lenis = useLenis((instance) => {
    scroll.set(instance.scroll);
  });

  const progress = useTransform(scroll, [0, 180], [0, 1]);

  const smoothProgress = useSpring(progress, {
    stiffness: 220,
    damping: 30,
    mass: 0.6,
  });

  // Закрываем меню при переходе на другую страницу.
  // Это официальный паттерн React «adjust state during render» —
  // вариант с setState внутри useEffect даёт лишний каскадный рендер
  // и ругается react-hooks/set-state-in-effect.
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // Пока меню открыто — останавливаем Lenis, иначе фон скроллится под оверлеем.
  useEffect(() => {
    if (!lenis) return;

    if (menuOpen) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  // Esc закрывает меню — базовая клавиатурная доступность.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="O(n) labs — на главную">
            <span className={styles.brand}>
              <span className={styles.brandCore}>O(n)</span>

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

          <nav className={styles.nav} aria-label="Основная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                aria-current={
                  pathname.startsWith(item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}

            <Link href="/contacts" className={styles.contactLink}>
              <span className={styles.liquid} />

              <span className={styles.contactText}>Обсудить проект</span>

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className={styles.ctaIcon}
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span data-open={menuOpen} />
              <span data-open={menuOpen} />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.menu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className={styles.menuNav} aria-label="Мобильная навигация">
              {[...NAV, { href: "/contacts", label: "Контакты" }].map(
                (item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.06 * index,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link href={item.href} className={styles.menuLink}>
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>

            <div className={styles.menuFooter}>
              <a href={`tel:+${site.phoneRaw}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
