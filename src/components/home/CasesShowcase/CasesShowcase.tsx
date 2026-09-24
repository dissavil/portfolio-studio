"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getFeaturedProjects, casePath } from "@/app/data/projects";

import styles from "./CasesShowcase.module.css";

// Регистрируем локально: компонент не должен зависеть от того,
// успел ли отработать SmoothScroll.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featured = getFeaturedProjects();

export default function CasesShowcase() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    // Горизонтальный скролл только на десктопе и только если
    // пользователь не просил убрать анимации.
    mm.add(
      {
        isDesktop: "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.isDesktop) return;

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
      },
    );

    // Картинки догружаются после расчёта пина — пересчитываем длину трека.
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section id="cases" ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>03 / Selected work</p>

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
        {featured.map((project, index) => (
          <Link
            key={project.slug}
            href={casePath(project.slug)}
            className={styles.card}
            style={{ "--project-accent": project.accent } as React.CSSProperties}
          >
            <div className={styles.cardTop}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.category}>{project.category}</span>
            </div>

            <div className={styles.preview}>
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={`${project.title} — ${project.subtitle}`}
                  fill
                  sizes="(max-width: 860px) 82vw, 560px"
                  className={styles.previewImage}
                />
              ) : (
                <span className={styles.previewFallback} aria-hidden="true">
                  {project.title}
                </span>
              )}
            </div>

            <div className={styles.meta}>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className={styles.tags}>
                {project.tags.slice(0, 4).map((tag) => (
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
