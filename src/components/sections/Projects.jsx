import { projects } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <SectionTitle
        tag="// proyectos"
        title="Lo que construí"
        subtitle="Proyectos personales y académicos. Cada uno representa algo que aprendí."
      />
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}