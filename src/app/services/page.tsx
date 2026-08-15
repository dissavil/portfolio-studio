import type { Metadata } from "next";

import Header from "@/components/home/Header/Header";
import ServicesShowcase from "@/components/home/ServicesShowcase/ServicesShowcase";
import Faq from "@/components/home/Faq/Faq";
import Contacts from "@/components/home/Contacts/Contacts";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";

export const metadata: Metadata = {
  title: "Услуги — OnLabs",
  description: "Веб-продукты, сайты, UI/UX и поддержка после запуска. Разработка в Алматы.",
};

export default function ServicesPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <ServicesShowcase />
        <Faq />
        <Contacts />
      </main>
      <SocialLinks />
    </div>
  );
}