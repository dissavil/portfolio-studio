import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="OnLabs — главная">
          <span className={styles.logoMark}>O</span>
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
            <span>Обсудить проект</span>
            <span className={styles.arrow}>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}