import Link from "next/link";

import { site } from "@/lib/site";
import { projects, casePath } from "@/app/data/projects";

import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.brand}>
            <span>O(n)</span>
            <span className={styles.brandLabs}>labs</span>
          </Link>

          <p className={styles.tagline}>
            Сайты для девелоперов и архитектурных бюро.
            <br />
            {site.city}, {site.country}.
          </p>
        </div>

        <nav className={styles.column} aria-label="Кейсы">
          <h2 className={styles.columnTitle}>Кейсы</h2>

          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={casePath(project.slug)}>{project.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.column} aria-label="Разделы">
          <h2 className={styles.columnTitle}>Студия</h2>

          <ul>
            <li>
              <Link href="/cases">Все кейсы</Link>
            </li>
            <li>
              <Link href="/services">Услуги</Link>
            </li>
            <li>
              <Link href="/contacts">Контакты</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Связаться</h2>

          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`tel:+${site.phoneRaw}`}>{site.phone}</a>
            </li>
            <li>
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>
            © {year} {site.name}
          </span>

          <span className={styles.built}>
            Сделано в {site.city} — архитектура и код
          </span>
        </div>
      </div>
    </footer>
  );
}
