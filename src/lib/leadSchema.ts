import { z } from "zod";

/**
 * Одна схема на клиент и сервер.
 * Клиентская валидация — для UX, серверная — единственная, которой можно верить:
 * POST на /api/lead можно отправить и мимо формы.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя")
    .max(80, "Слишком длинное имя"),

  contact: z
    .string()
    .trim()
    .min(4, "Оставьте способ связи")
    .max(120, "Слишком длинная строка"),

  message: z
    .string()
    .trim()
    .min(10, "Расскажите чуть подробнее о задаче")
    .max(2000, "Слишком длинное сообщение"),

  /** Honeypot: скрытое поле, которое заполняют только боты. */
  company: z.string().max(0).optional(),

  /** Откуда пришла заявка — /cases/montera, /services и т.д. */
  source: z.string().max(200).optional(),
});

export type LeadValues = z.infer<typeof leadSchema>;
