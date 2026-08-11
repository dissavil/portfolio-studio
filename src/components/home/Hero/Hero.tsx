import Link from "next/link";

import Magnetic from "@/components/animation/Magnetic/Magnetic";
import Reveal from "@/components/animation/Reveal/Reveal";
import SplitText from "@/components/animation/SplitText/SplitText";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Reveal
            trigger="mount"
            delay={0.1}
            y={20}
          >
            <p className={styles.eyebrow}>
              WEB STUDIO / ALMATY — KZ
            </p>
          </Reveal>

          <SplitText
            trigger="mount"
            delay={0.2}
            stagger={0.1}
            duration={0.9}
            className={styles.title}
          >
            Мы создаём
            digital-продукты,
            которые работают.
          </SplitText>

          <Reveal
            trigger="mount"
            delay={0.7}
            y={30}
          >
            <div className={styles.bottom}>
              <p className={styles.description}>
                Сайты, веб-приложения и цифровые системы
                для компаний, которые хотят расти,
                а не просто присутствовать в интернете.
              </p>

              <Magnetic strength={0.2}>
                <Link
                  href="/contacts"
                  className={styles.cta}
                >
                  <span>Обсудить проект</span>

                  <span className={styles.ctaIcon}>
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal
          trigger="mount"
          delay={1.1}
          y={10}
        >
          <div className={styles.scrollIndicator}>
            <span>SCROLL TO EXPLORE</span>

            <span className={styles.scrollLine} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}