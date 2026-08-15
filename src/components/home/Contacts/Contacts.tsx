"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { ArrowUpRight, Check } from "lucide-react";

import Reveal from "@/components/animation/Reveal/Reveal";

import styles from "./Contacts.module.css";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  contact: z.string().min(4, "Оставьте способ связи"),
  message: z
    .string()
    .min(10, "Расскажите чуть подробнее о задаче"),
});

type FormValues = z.infer<typeof schema>;

export default function Contacts() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    // TODO: подключить реальную отправку.
    await new Promise((resolve) =>
      setTimeout(resolve, 500),
    );

    setSent(true);
    reset();
  };

  return (
    <section
      id="contacts"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <Reveal>
            <p className={styles.eyebrow}>
              06 / GET IN TOUCH
            </p>

            <h2 className={styles.title}>
              Обсудим
              <br />
              ваш проект?
            </h2>

            <p className={styles.description}>
              Расскажите о задаче — ответим в
              течение рабочего дня. Быстрее всего —
              в WhatsApp или Telegram.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className={styles.direct}
          >
            <a
              href="https://wa.me/00000000000"
              className={styles.directLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp
                size={18}
                aria-hidden="true"
              />

              <span>WhatsApp</span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className={styles.directArrow}
                aria-hidden="true"
              />
            </a>

            <a
              href="https://t.me/onlabs"
              className={styles.directLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram
                size={18}
                aria-hidden="true"
              />

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

        <Reveal
          delay={0.15}
          className={styles.right}
        >
          {sent ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>
                <Check
                  size={20}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>

              <p>
                Заявка отправлена. Ответим в
                течение рабочего дня.
              </p>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.field}>
                <label htmlFor="name">
                  Имя
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Как к вам обращаться"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name
                      ? "name-error"
                      : undefined
                  }
                  {...register("name")}
                />

                {errors.name && (
                  <span
                    id="name-error"
                    className={styles.error}
                  >
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact">
                  Телефон, WhatsApp или email
                </label>

                <input
                  id="contact"
                  type="text"
                  placeholder="+7 705 000 00 00"
                  aria-invalid={!!errors.contact}
                  aria-describedby={
                    errors.contact
                      ? "contact-error"
                      : undefined
                  }
                  {...register("contact")}
                />

                {errors.contact && (
                  <span
                    id="contact-error"
                    className={styles.error}
                  >
                    {errors.contact.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="message">
                  О задаче
                </label>

                <textarea
                  id="message"
                  rows={4}
                  placeholder="Что нужно сделать, какие сроки"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message
                      ? "message-error"
                      : undefined
                  }
                  {...register("message")}
                />

                {errors.message && (
                  <span
                    id="message-error"
                    className={styles.error}
                  >
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? "Отправляем…"
                    : "Отправить"}
                </span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}