
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
              Web studio / Almaty — KZ
            </p>
          </Reveal>
          <SplitText
            trigger="mount"
            delay={0.2}
            stagger={0.1}
            duration={0.9}
            className={styles.title}
          >
            Создаём сайты и
            digital-продукты
            под реальные задачи.
          </SplitText>

          <Reveal trigger="mount" delay={0.7} y={30}>
            <div className={styles.bottom}>
              <p className={styles.description}>
                От структуры и дизайна до разработки и запуска.
                Делаем сайты, веб-продукты и интерактивные решения,
                собирая всё внутри одной команды.
              </p>

              <Link href="/cases" className={styles.cta}>
                <span className={styles.liquid} />

                <span className={styles.casesLink} >Смотреть кейсы</span>

                <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className={styles.ctaIcon}
                aria-hidden="true"
              />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
