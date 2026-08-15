"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "@/app/data/services";

import styles from "./ServicesShowcase.module.css";

export default function ServicesShowcase() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;

    if (!wrapper || !stage) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 761px)", () => {
      gsap.set(wrapper, { height: `${services.length * 100}svh` });

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        onUpdate: (self) => {
          const index = Math.min(
            services.length - 1,
            Math.floor(self.progress * services.length),
          );
          setActive(index);
        },
      });

      return () => {
        trigger.kill();
        gsap.set(wrapper, { clearProps: "height" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="services" ref={wrapperRef} className={styles.wrapper}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.eyebrow}>04 / OUR SERVICES</p>

            <h2 className={styles.title}>
              Чем мы
              <br />
              занимаемся
            </h2>

            <ul className={styles.list}>
              {services.map((service, index) => (
                <li
                  key={service.title}
                  className={index === active ? styles.itemActive : styles.item}
                >
                  <span className={styles.num}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{service.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.right}>
            {services.map((service, index) => (
              <article
                key={service.title}
                className={index === active ? styles.panelActive : styles.panel}
                aria-hidden={index !== active}
              >
                <div className={styles.visual}>
                  <span>{service.tag}</span>
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}