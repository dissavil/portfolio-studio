import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { projects } from "@/app/data/project";
import styles from "./FeaturedCases.module.css";
import {ArrowUpRight} from "lucide-react"


export default function FeaturedCases() {
  return (
    <section className={styles.section} id="cases">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>SELECTED WORK</p>

            <h2 className={styles.title}>
              Проекты, которыми
              <br />
              мы гордимся.
            </h2>
          </div>

          <p className={styles.description}>
            Мы не просто создаём интерфейсы.
            Мы превращаем бизнес-задачи
            в цифровые продукты.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              category={project.category}
              tags={project.tags}
              href={project.href}
            />
          ))}
        </div>

        <div className={styles.footer}>

          <a href="/cases" className={styles.allCases}>
            
            <span className={styles.liquid} />

            <span className={styles.allCasesText}>
              Смотреть все проекты
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              className={styles.ctaIcon}
              aria-hidden = "true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}