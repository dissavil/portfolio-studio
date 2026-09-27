import type { Metadata } from "next";

import Header from "@/components/home/Header/Header";
import Contacts from "@/components/home/Contacts/Contacts";
import Footer from "@/components/layout/Footer/Footer";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";
import { services } from "@/app/data/services";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Сайты для жилых комплексов, интерактивные планировки, 3D-туры и сопровождение для девелоперов и архитектурных бюро.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main id="main">
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            Services / {String(services.length).padStart(2, "0")}
          </p>

          <h1 className={styles.title}>
            Сайты, которые помогают
            <br />
            продавать архитектуру.
          </h1>

          <p className={styles.description}>
            От презентации объекта до планировок, 3D-туров и заявок в отдел
            продаж.
          </p>
        </header>

        <section className={styles.list} aria-labelledby="services-title">
          <h2 id="services-title" className="sr-only">
            Наши услуги
          </h2>

          {services.map((service, index) => (
            <article className={styles.item} key={service.title}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className={styles.content}>
                <p className={styles.tag}>{service.tag}</p>
                <h3 className={styles.itemTitle}>{service.title}</h3>
                <p className={styles.itemDescription}>
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <Contacts />
      </main>

      <Footer />
      <SocialLinks />
    </div>
  );
}