import type { Metadata } from "next";

import Header from "@/components/home/Header/Header";
import ServicesShowcase from "@/components/home/ServicesShowcase/ServicesShowcase";
import Contacts from "@/components/home/Contacts/Contacts";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";
import Footer from "@/components/layout/Footer/Footer";
import { services } from "@/app/data/services";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Сайты для жилых комплексов, интерактивные планировки, 3D-туры и сопровождение для девелоперов и архитектурных бюро.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main id="main">
        <header className={styles.head}>
          <p className={styles.eyebrow}>Services / {services.length}</p>

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

        <ServicesShowcase />
        <Contacts />
      </main>

      <Footer />
      <SocialLinks />
    </div>
  );
}
