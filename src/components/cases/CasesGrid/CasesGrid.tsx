"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import ProjectCard from "@/components/ProjectCard/ProjectCard";
import type { Project } from "@/app/data/projects";

import styles from "./CasesGrid.module.css";

interface CasesGridProps {
  projects: Project[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function CasesGrid({ projects }: CasesGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.grid}
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial={shouldReduceMotion ? undefined : "hidden"}
      /* whileInView вместо animate: карточки ниже первого экрана
         не проигрывают анимацию «в пустоту» до того, как их увидят. */
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.05 }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          className={styles.item}
          variants={shouldReduceMotion ? undefined : cardVariants}
        >
          <ProjectCard project={project} priority={index < 2} />
        </motion.div>
      ))}
    </motion.div>
  );
}
