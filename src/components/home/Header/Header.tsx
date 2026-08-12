import Link from "next/link";
import styles from "./Header.module.css";
import {ArrowUpRight} from "lucide-react"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} >
          <span>OnLabs</span>
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          <Link href="/cases" className={styles.navLink}>
            Кейсы
          </Link>

          <Link href="/services" className={styles.navLink}>
            Услуги
          </Link>

          <Link href="/contacts" className={styles.contactLink}>
            
            <span className={styles.liquid} />

            <span className={styles.contactText}>
              Обсудить проект
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              className={styles.ctaIcon}
              aria-hidden = "true"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}