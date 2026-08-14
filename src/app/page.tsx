import Header from "@/components/home/Header/Header";
import Hero from "@/components/home/Hero/Hero";
import FeaturedCases from "@/components/home/FeaturedCases/FeaturedCases";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main>
        <Hero />
        <FeaturedCases />
      </main>
    <SocialLinks />
    </div>
  );
}