import Header from "@/components/home/Header/Header";
import Hero from "@/components/home/Hero/Hero";
import OurApproach from "@/components/home/OurApproach/OurApproach";
import CasesShowcase from "@/components/home/CasesShowcase/CasesShowcase";
import ServicesShowcase from "@/components/home/ServicesShowcase/ServicesShowcase";
import Faq from "@/components/home/Faq/Faq";
import Contacts from "@/components/home/Contacts/Contacts";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";
import Footer from "@/components/layout/Footer/Footer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main id="main">
        <Hero />
        <OurApproach />
        <CasesShowcase />
        <ServicesShowcase />
        <Faq />
        <Contacts />
      </main>

      <Footer />

      <SocialLinks />
    </div>
  );
}
