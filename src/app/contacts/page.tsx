import type { Metadata } from "next";

import Header from "@/components/home/Header/Header";
import Contacts from "@/components/home/Contacts/Contacts";
import SocialLinks from "@/components/social/SocialLinks/SocialLinks";

export const metadata: Metadata = {
  title: "Контакты — OnLabs",
  description: "Расскажите о задаче — ответим в течение рабочего дня. WhatsApp, Telegram или форма на сайте.",
};

export default function ContactsPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <Contacts />
      </main>
      <SocialLinks />
    </div>
  );
}