"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

import { projects } from "@/app/data/project";

import styles from "./CasesShowcase.module.css";

export default function CasesShowcase() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px)", () => {
      const getDistance = () => track.scrollWidth - wrapper.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="cases" ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>03 / SELECTED WORK</p>

        <h2 className={styles.title}>
          Кейсы, которыми
          <br />
          мы гордимся
        </h2>

        <Link href="/cases" className={styles.allLink}>
          <span>Все проекты</span>
          <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>

      <div ref={trackRef} className={styles.track}>
        {projects.map((project, index) => (
          <Link key={project.title} href={project.href} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.category}>{project.category}</span>
            </div>

            <div className={styles.preview}>
              <span>PREVIEW</span>
            </div>

            <div className={styles.meta}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        <Link href="/cases" className={styles.endCard}>
          <span>Смотреть все проекты</span>
          <span className={styles.endIcon}>
            <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}