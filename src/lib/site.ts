/**
 * Единая точка правды по контактам, домену и соцсетям.
 *
 * Всё, что помечено TODO — замени на реальные значения.
 * После этого хардкод телефонов/ссылок по компонентам не нужен.
 */

export const site = {
  name: "O(n) labs",
  shortName: "O(n) labs",

  // TODO: заменить на боевой домен, когда прикрутишь его в Vercel.
  // metadataBase и sitemap строятся от этого значения.
  url: "https://portfolio-studio-azure.vercel.app",

  title: "O(n) labs — сайты для девелоперов и архитектурных бюро",

  description:
    "Проектируем и разрабатываем сайты для жилых комплексов, клубных посёлков и архитектурных бюро. Архитектурный бэкграунд + собственная разработка. Алматы.",

  city: "Алматы",
  country: "KZ",

  // TODO: подставить реальные контакты
  email: "hello@onlabs.kz",
  phone: "+7 700 000 00 00",
  phoneRaw: "77000000000",

  socials: {
    whatsapp: "https://wa.me/77000000000",
    telegram: "https://t.me/onlabs",
    instagram: "https://instagram.com/onlabs",
    github: "https://github.com/dissavil",
  },

  /** Сколько времени обещаем на ответ — используется в формах и FAQ. */
  responseTime: "в течение рабочего дня",
} as const;

export const navigation = [
  { href: "/cases", label: "Кейсы" },
  { href: "/services", label: "Услуги" },
  { href: "/contacts", label: "Контакты" },
] as const;
