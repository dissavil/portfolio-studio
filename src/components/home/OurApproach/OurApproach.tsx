"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import styles from "./OurApproach.module.css";

const steps = [
  {
    number: "01",
    label: "Задача",
    title:
      "Сначала понимаем, что именно должен решать продукт.",
    description:
      "Разбираемся в бизнесе, пользователях, контексте и ограничениях проекта.",
  },
  {
    number: "02",
    label: "Решение",
    title:
      "Собираем структуру и визуальный язык продукта.",
    description:
      "Проектируем сценарии, интерфейс и техническую основу до начала разработки.",
  },
  {
    number: "03",
    label: "Результат",
    title:
      "Превращаем идею в работающий продукт.",
    description:
      "Дизайн, разработка и запуск идут как один процесс — без передачи проекта между командами.",
  },
];

export default function OurApproach() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"],
  });

  const sectionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"],
  );

  return (
    <section
      ref={wrapperRef}
      className={styles.wrapper}
    >
      <div className={styles.stage}>
        <motion.section
          className={styles.section}
          style={{ y: sectionY }}
        >
          <div className={styles.container}>
            <header className={styles.heading}>
              <p className={styles.eyebrow}>
                02 / OUR APPROACH
              </p>

              <h2 className={styles.title}>
                Думаем о задаче,
                а не просто о интерфейсе.
              </h2>
            </header>

            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={styles.stepGroup}
                >
                  <motion.article
                    className={styles.step}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className={styles.meta}>
                      <span>{step.number}</span>
                      <span>{step.label}</span>
                    </div>

                    <div className={styles.content}>
                      <h3>{step.title}</h3>

                      <p>
                        {step.description}
                      </p>
                    </div>
                  </motion.article>

                  {index < steps.length - 1 && (
                    <motion.div
                      className={styles.line}
                      initial={{
                        scaleY: 0,
                      }}
                      whileInView={{
                        scaleY: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.5,
                      }}
                      transition={{
                        duration: 0.6,
                        delay:
                          index * 0.35 + 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}