export interface Project {
  title: string;
  description: string;
  category: string;
  tags: string[];
  href: string;
}

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "Цифровой продукт с фокусом на пользовательский опыт и конверсию.",
    category: "Web Design & Development",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    href: "/cases/project-one",
  },
  {
    title: "Project Two",
    description:
      "Современная digital-платформа для бизнеса с удобной системой управления.",
    category: "Web Application",
    tags: ["React", "TypeScript", "API"],
    href: "/cases/project-two",
  },
  {
    title: "Project Three",
    description:
      "Премиальный сайт, который объединяет визуальную айдентику бренда и бизнес-задачи.",
    category: "Digital Experience",
    tags: ["Next.js", "Design", "Development"],
    href: "/cases/project-three",
  },
];