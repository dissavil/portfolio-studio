import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/leadSchema";

/**
 * Приём заявок с формы.
 *
 * Переменные окружения (.env.local + Vercel → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN=123456:AA...   — токен от @BotFather
 *   TELEGRAM_CHAT_ID=-1001234567890   — id чата/канала, куда падают заявки
 *
 * Как получить chat id: напиши боту что-нибудь и открой
 * https://api.telegram.org/bot<TOKEN>/getUpdates — id будет в result[].message.chat.id
 */

export const runtime = "nodejs";

// Простой rate limit в памяти процесса.
// Хватает, чтобы отсечь ручной спам. Для serverless с несколькими инстансами
// это не «настоящий» лимит — если пойдёт вал, ставь @upstash/ratelimit.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Не даём Map расти бесконечно на долгоживущем инстансе.
  if (hits.size > 5000) hits.clear();

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много попыток. Попробуйте через минуту." },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Проверьте поля формы" },
      { status: 422 },
    );
  }

  const { name, contact, message, company, source } = parsed.data;

  // Honeypot сработал — отвечаем успехом, чтобы бот не подбирал обход.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");

    return NextResponse.json(
      { ok: false, error: "Форма временно недоступна. Напишите в WhatsApp." },
      { status: 500 },
    );
  }

  const text = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Связь:</b> ${escapeHtml(contact)}`,
    `<b>Задача:</b> ${escapeHtml(message)}`,
    "",
    `<i>Страница: ${escapeHtml(source ?? "—")}</i>`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        // Не даём запросу висеть дольше 8 секунд.
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      console.error("[lead] Telegram ответил", response.status);

      return NextResponse.json(
        { ok: false, error: "Не удалось отправить. Напишите в WhatsApp." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[lead] Ошибка отправки", error);

    return NextResponse.json(
      { ok: false, error: "Не удалось отправить. Напишите в WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
