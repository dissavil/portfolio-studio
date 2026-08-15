"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

import Reveal from "@/components/animation/Reveal/Reveal";
import { faqItems } from "@/app/data/faq"

import styles from "./Faq.module.css";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <p className={styles.eyebrow}>05 / FAQ</p>

          <h2 className={styles.title}>
            Частые
            <br />
            вопросы
          </h2>
        </Reveal>

        <div className={styles.list}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={styles.item}
                style={{ zIndex: isOpen ? faqItems.length : index }}
              >
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={styles.num}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.questionText}>{item.question}</span>

                  <span className={styles.icon} data-open={isOpen}>
                    <Plus size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="leaf"
                      className={styles.leaf}
                      initial={{ height: 0, opacity: 0, rotateX: -18 }}
                      animate={{ height: "auto", opacity: 1, rotateX: 0 }}
                      exit={{ height: 0, opacity: 0, rotateX: -18 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "top center", transformPerspective: 900 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}