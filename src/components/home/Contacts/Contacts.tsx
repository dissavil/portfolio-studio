"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { ArrowUpRight, Check } from "lucide-react";

import Reveal from "@/components/animation/Reveal/Reveal";
import { leadSchema, type LeadValues } from "@/lib/leadSchema";
import { site } from "@/lib/site";

import styles from "./Contacts.module.css";

export default function Contacts() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (values: LeadValues) => {
    setServerError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: pathname }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setServerError(data.error ?? "Что-то пошло не так. Попробуйте ещё раз.");
        return;
      }

      setSent(true);
      reset();
    } catch {
      setServerError(
        "Не получилось отправить. Проверьте соединение или напишите в WhatsApp.",
      );
    }
  };

  return (
    <section id="contacts" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Reveal>
            <p className={styles.eyebrow}>06 / Get in touch</p>

            <h2 className={styles.title}>
              Обсудим
              <br />
              ваш проект?
            </h2>

            <p className={styles.description}>
              Расскажите о задаче — ответим {site.responseTime}. Быстрее всего —
              в WhatsApp или Telegram.
            </p>
          </Reveal>

          <Reveal delay={0.1} className={styles.direct}>
            <a
              href={site.socials.whatsapp}
              className={styles.directLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              <span>WhatsApp</span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className={styles.directArrow}
                aria-hidden="true"
              />
            </a>

            <a
              href={site.socials.telegram}
              className={styles.directLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram size={18} aria-hidden="true" />
              <span>Telegram</span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className={styles.directArrow}
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className={styles.right}>
          {sent ? (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}>
                <Check size={20} strokeWidth={2} aria-hidden="true" />
              </span>

              <p>Заявка отправлена. Ответим {site.responseTime}.</p>

              <button
                type="button"
                className={styles.resetButton}
                onClick={() => setSent(false)}
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Honeypot: реальный человек это поле не увидит. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="company">Компания</label>

                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="name">Имя</label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />

                {errors.name && (
                  <span id="name-error" className={styles.error}>
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact">Телефон, WhatsApp или email</label>

                <input
                  id="contact"
                  type="text"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+7 705 000 00 00"
                  aria-invalid={!!errors.contact}
                  aria-describedby={errors.contact ? "contact-error" : undefined}
                  {...register("contact")}
                />

                {errors.contact && (
                  <span id="contact-error" className={styles.error}>
                    {errors.contact.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="message">О задаче</label>

                <textarea
                  id="message"
                  rows={4}
                  placeholder="Что нужно сделать, какие сроки"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                />

                {errors.message && (
                  <span id="message-error" className={styles.error}>
                    {errors.message.message}
                  </span>
                )}
              </div>

              {serverError && (
                <p className={styles.serverError} role="alert">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Отправляем…" : "Отправить"}</span>

                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
