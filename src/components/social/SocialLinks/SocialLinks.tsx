"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import styles from "./SocialLinks.module.css";

export default function SocialLinks() {
  return (
    <div className={styles.container}>
      <a
        href="#"
        className={`${styles.btn} ${styles.instagram}`}
        aria-label="FaInstagram"
      >
        <span className={`${styles.liquid} ${styles.instaLiquid}`} />

        <FaInstagram
          className={styles.icon}
          strokeWidth={1.8}
        />
      </a>

      <a
        href="#"
        className={`${styles.btn} ${styles.whatsapp}`}
        aria-label="FaWhatsApp"
      >
        <span className={`${styles.liquid} ${styles.waLiquid}`} />

        <FaWhatsapp
          className={styles.icon}
          strokeWidth={1.8}
        />
      </a>
    </div>
  );
}