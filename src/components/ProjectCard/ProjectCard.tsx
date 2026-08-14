import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category: string;
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  category,
  href = "#",
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={styles.card}
    >
      <div className={styles.imagePlaceholder}>
        <span>PREVIEW</span>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.category}>
            {category}
          </span>

          <span className={styles.arrow}>
            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
        </div>

        <h2 className={styles.title}>
          {title}
        </h2>

        <p className={styles.description}>
          {description}
        </p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}