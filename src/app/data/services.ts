export interface Service {
  title: string;
  description: string;
  tag: string;
}

export const services: Service[] = [
  {
    title: "Веб-продукты",
    description:
      "Дизайн и разработка веб-приложений и платформ — от первого прототипа до продакшена.",
    tag: "PRODUCT",
  },
  {
    title: "Сайты",
    description:
      "Корпоративные и промо-сайты, которые презентуют бренд и не стыдно показать инвестору.",
    tag: "WEBSITE",
  },
  {
    title: "UI/UX",
    description:
      "Интерфейсы и дизайн-система, за которые не приходится извиняться перед пользователем.",
    tag: "DESIGN",
  },
  {
    title: "Поддержка",
    description:
      "После запуска не исчезаем — доводим, чиним и развиваем продукт дальше.",
    tag: "SUPPORT",
  },
];