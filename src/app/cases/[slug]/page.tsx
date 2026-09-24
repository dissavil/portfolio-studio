import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import Header from "@/components/home/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Contacts from "@/components/home/Contacts/Contacts";
import Reveal from "@/components/animation/Reveal/Reveal";

import {
  projects,
  getProject,
  getNextProject,
  casePath,
} from "@/app/data/projects";
import { site } from "@/lib/site";

import styles from "./page.module.css";

/**
 * Все кейсы известны на этапе сборки — Next отрендерит их статикой.
 * Добавил проект в projects.ts → появилась новая статическая страница.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

interface PageProps {
  // В Next 15+ params — это Promise, его нужно await'ить.
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Кейс не найден" };
  }

  const title = `${project.title} — ${project.subtitle}`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: casePath(project.slug),
    },
    openGraph: {
      title,
      description: project.summary,
      url: `${site.url}${casePath(project.slug)}`,
      type: "article",
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const next = getNextProject(project.slug);

  return (
    <>
      <Header />

      <main
        className={styles.page}
        style={{ "--project-accent": project.accent } as React.CSSProperties}
      >
        <article>
          <header className={styles.hero}>
            <div className={styles.container}>
              <Link href="/cases" className={styles.back}>
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                <span>Все кейсы</span>
              </Link>

              <p className={styles.eyebrow}>{project.category}</p>

              <h1 className={styles.title}>{project.title}</h1>

              <p className={styles.subtitle}>{project.subtitle}</p>

              <dl className={styles.meta}>
                <div>
                  <dt>Клиент</dt>
                  <dd>{project.client}</dd>
                </div>

                <div>
                  <dt>Год</dt>
                  <dd>{project.year}</dd>
                </div>

                <div>
                  <dt>Роль</dt>
                  <dd>{project.role.join(", ")}</dd>
                </div>

                <div>
                  <dt>Сайт</dt>
                  <dd>
                    <a
                      href={project.url}
                      className={styles.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{project.domain}</span>

                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div className={styles.coverWrap}>
            <div className={styles.cover}>
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={`${project.title} — главный экран сайта`}
                  fill
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className={styles.coverImage}
                  priority
                />
              ) : (
                <span className={styles.coverFallback} aria-hidden="true">
                  {project.title}
                </span>
              )}
            </div>
          </div>

          <section className={styles.metrics} aria-label="Ключевые цифры">
            <div className={styles.container}>
              <ul className={styles.metricsList}>
                {project.metrics.map((metric) => (
                  <li key={metric.label}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.block}>
            <div className={styles.container}>
              <div className={styles.split}>
                <p className={styles.blockEyebrow}>01 / Задача</p>

                <Reveal>
                  <p className={styles.lead}>{project.challenge}</p>
                </Reveal>
              </div>
            </div>
          </section>

          <section className={styles.block}>
            <div className={styles.container}>
              <div className={styles.split}>
                <p className={styles.blockEyebrow}>02 / Решение</p>

                <div className={styles.solution}>
                  {project.solution.map((item, index) => (
                    <Reveal key={item.title} delay={index * 0.08}>
                      <div className={styles.solutionItem}>
                        <span className={styles.solutionNum}>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h2>{item.title}</h2>
                        <p>{item.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.block}>
            <div className={styles.container}>
              <div className={styles.split}>
                <p className={styles.blockEyebrow}>03 / Стек</p>

                <ul className={styles.stack}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {project.gallery && project.gallery.length > 0 && (
            <section className={styles.gallery} aria-label="Галерея проекта">
              {project.gallery.map((src, index) => (
                <div key={src} className={styles.galleryItem}>
                  <Image
                    src={src}
                    alt={`${project.title} — экран ${index + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </section>
          )}

          <section className={styles.visit}>
            <div className={styles.container}>
              <a
                href={project.url}
                className={styles.visitLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Открыть {project.title}</span>

                <span className={styles.visitIcon}>
                  <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </a>
            </div>
          </section>
        </article>

        <nav className={styles.nextNav} aria-label="Следующий кейс">
          <Link href={casePath(next.slug)} className={styles.nextLink}>
            <span className={styles.nextLabel}>Следующий кейс</span>

            <span className={styles.nextTitle}>{next.title}</span>

            <span className={styles.nextSubtitle}>{next.subtitle}</span>
          </Link>
        </nav>

        <Contacts />
      </main>

      <Footer />
    </>
  );
}
