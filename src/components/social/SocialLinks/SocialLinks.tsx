"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { site } from "@/lib/site";

import styles from "./SocialLinks.module.css";

export default function SocialLinks() {
  return (
    <div className={styles.container}>
      <a
        href={site.socials.instagram}
        className={`${styles.btn} ${styles.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram студии"
      >
        <span className={`${styles.liquid} ${styles.instaLiquid}`} />

        <FaInstagram className={styles.icon} aria-hidden="true" />
      </a>

      <a
        href={site.socials.whatsapp}
        className={`${styles.btn} ${styles.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
      >
        <span className={`${styles.liquid} ${styles.waLiquid}`} />

        <FaWhatsapp className={styles.icon} aria-hidden="true" />
      </a>
    </div>
  );
}
