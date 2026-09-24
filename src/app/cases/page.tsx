import type { Metadata } from "next";

import Header from "@/components/home/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import CasesGrid from "@/components/cases/CasesGrid/CasesGrid";
import Contacts from "@/components/home/Contacts/Contacts";

import { projects } from "@/app/data/projects";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Сайты для жилых комплексов, клубных посёлков и архитектурных бюро: V Club Villas, Montera, Las Casas, ЖК Симфония, SNP.ARCH.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Selected work / {projects.length}</p>

          <h1 className={styles.title}>
            Проекты, где архитектура
            <br />
            встречается с кодом
          </h1>

          <p className={styles.description}>
            Девелоперские проекты и архитектурные бюро Алматы. Каждый сайт —
            от первого экрана до заявки в CRM.
          </p>
        </header>

        <CasesGrid projects={projects} />

        <Contacts />
      </main>

      <Footer />
    </>
  );
}
