import styles from './ProjectCard.module.css';

// Определяем строгий интерфейс (типизацию) для нашего компонента
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
}

export default function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        {/* Позже мы заменим этот div на настоящий компонент <Image> из Next.js */}
        <span>Изображение проекта</span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}