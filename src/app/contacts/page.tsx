import type { Metadata } from "next";

import Header from "@/components/home/Header/Header";
import Contacts from "@/components/home/Contacts/Contacts";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";
import Footer from "@/components/layout/Footer/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Расскажите о задаче — ответим ${site.responseTime}. WhatsApp, Telegram или форма на сайте. ${site.city}.`,
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <div>
      <Header />

      <main id="main" style={{ paddingTop: "120px" }}>
        <Contacts />
      </main>

      <Footer />

      <SocialLinks />
    </div>
  );
}
