import ProjectCard from './components/ProjectCard/ProjectCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Мы проектируем надежные системы</h1>
        <p>Разработка коммерческих сайтов, CRM и сложной архитектуры.</p>
      </header>

      <section className={styles.portfolioGrid}>
        <ProjectCard 
          title="Сайт и CRM для стоматологии"
          description="Разработка коммерческого сайта и системы управления клиентами для стоматологической клиники."
          tags={['Next.js', 'React', 'CRM']}
        />
        <ProjectCard 
          title="Resona AI"
          description="Концепт приложения для развития цифровой медиаграмотности, подготовленный для UNESCO Youth Hackathon."
          tags={['AI', 'Web', 'EdTech']}
        />
        <ProjectCard 
          title="Scream to See"
          description="Высокоуровневая архитектура систем для кооперативного хоррора."
          tags={['Unreal Engine 5.6.1', 'C++', 'System Architecture']}
        />
      </section>
    </div>
  );
}