import Link from "next/link";

import Header from "@/components/home/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main" className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>

          <h1 className={styles.title}>Такой страницы нет</h1>

          <p className={styles.text}>
            Возможно, ссылка устарела или в адресе опечатка. Посмотрите кейсы —
            там всё, что мы сделали.
          </p>

          <div className={styles.actions}>
            <Link href="/cases" className={styles.primary}>
              Смотреть кейсы
            </Link>

            <Link href="/" className={styles.secondary}>
              На главную
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
