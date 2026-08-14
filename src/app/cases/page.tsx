import Header from "@/components/home/Header/Header";
import CasesGrid from "@/components/cases/CasesGrid/CasesGrid";

import { projects } from "@/app/data/project";

import styles from "./page.module.css";

export default function CasesPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <CasesGrid projects={projects} />
      </main>
    </>
  );
}