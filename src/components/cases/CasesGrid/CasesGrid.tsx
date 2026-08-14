"use client";

import { motion, type Variants } from "motion/react";

import ProjectCard from "@/components/ProjectCard/ProjectCard";
import type { Project } from "@/app/data/project";

import styles from "./CasesGrid.module.css";

interface CasesGridProps {
  projects: Project[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function CasesGrid({
  projects,
}: CasesGridProps) {
  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div
          key={project.title}
          className={styles.item}
          variants={cardVariants}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            category={project.category}
            tags={project.tags}
            href={project.href}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}