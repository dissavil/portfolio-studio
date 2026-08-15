import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/animation/Reveal/Reveal";
import SplitText from "@/components/animation/SplitText/SplitText";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Reveal trigger="mount" delay={0.1} y={20}>
            <p className={styles.eyebrow}>WEB STUDIO / ALMATY — KZ</p>
          </Reveal>

          <SplitText
            trigger="mount"
            delay={0.2}
            stagger={0.1}
            duration={0.9}
            className={styles.title}
          >
            Мы создаём
            digital продукты,
            которые работают.
          </SplitText>

          <Reveal trigger="mount" delay={0.7} y={30}>
            <div className={styles.bottom}>
              <p className={styles.description}>
                Сайты, веб-приложения и цифровые системы
                для компаний, которые хотят расти,
                а не просто присутствовать в интернете.
              </p>

              <div className={styles.actions}>
                <Link href="/contacts" className={styles.cta}>
                  <span>Обсудить проект</span>

                  <span className={styles.ctaIcon}>
                    <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </Link>

                <Link href="#cases" className={styles.secondaryLink}>
                  Смотреть кейсы
                </Link>
              </div>
            </div>
          </Reveal>

          <div className={styles.scrollIndicator}>
            <span>SCROLL</span>
            <span className={styles.scrollLine} />
          </div>
        </div>
      </div>
    </section>
  );
}