import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { casePath, type Project } from "@/app/data/projects";

import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  /** Первые две карточки в сетке грузим приоритетно — это LCP. */
  priority?: boolean;
}

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  const {
    slug,
    title,
    subtitle,
    summary,
    category,
    tags,
    year,
    cover,
    accent,
  } = project;

  return (
    <Link
      href={casePath(slug)}
      className={styles.card}
      style={{ "--project-accent": accent } as React.CSSProperties}
    >
      <div className={styles.media}>
        {cover ? (
          <Image
            src={cover}
            alt={`${title} — ${subtitle}`}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 700px"
            className={styles.image}
            priority={priority}
          />
        ) : (
          /* Заглушка, пока нет скриншота: инициал + акцентный градиент. */
          <span className={styles.fallback} aria-hidden="true">
            {title.slice(0, 2)}
          </span>
        )}

        <span className={styles.year}>{year}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.category}>{category}</span>

          <span className={styles.arrow}>
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.subtitle}>{subtitle}</p>

        <p className={styles.description}>{summary}</p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
