import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/animation/Reveal/Reveal";
import SplitText from "@/components/animation/SplitText/SplitText";
import { projects } from "@/app/data/projects";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Reveal trigger="mount" delay={0.1} y={20}>
            <p className={styles.eyebrow}>
              Web studio / Almaty — KZ / {projects.length} проектов
            </p>
          </Reveal>

          {/*
            Было: «Мы создаём digital продукты, которые работают».
            Так говорит любая студия. Новый заголовок называет,
            для кого мы работаем, — это и есть отличие.
          */}
          <SplitText
            trigger="mount"
            delay={0.2}
            stagger={0.1}
            duration={0.9}
            className={styles.title}
          >
            Сайты для девелоперов
            и архитектурных бюро.
            Проектируем и пишем сами.
          </SplitText>

          <Reveal trigger="mount" delay={0.7} y={30}>
            <div className={styles.bottom}>
              <p className={styles.description}>
                Жилые комплексы, клубные посёлки и архитектурные студии.
                Архитектурный бэкграунд плюс собственная разработка — поэтому
                не приходится объяснять, что такое экспликация и зачем рендеру
                грузиться первым.
              </p>

              <Link href="/cases" className={styles.cta}>
                <span>Смотреть кейсы</span>

                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
