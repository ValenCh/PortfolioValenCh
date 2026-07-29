import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import styles from './Projects.module.css';

function skillMatchesTag(skillName, tag) {
  const normalize = (s) => s.toLowerCase().replace(/[\s./]/g, '');
  const parts = skillName.split('/').map((p) => normalize(p));
  return parts.includes(normalize(tag));
}

export default function Projects({ selectedSkill, onClearSkill }) {
  const { projects, ui } = usePortfolioData();
  const [activeProject, setActiveProject] = useState(null);

  const bentoPattern = [styles.spanWide, styles.spanNarrow];

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <SectionTitle tag={ui.projects.tag} title={ui.projects.title} subtitle={ui.projects.subtitle} />

      {selectedSkill && (
        <button className={styles.filterChip} onClick={onClearSkill}>
          <span>{ui.skills.filterHint} <strong>{selectedSkill}</strong></span>
          <span className={styles.filterClear}>✕ {ui.projects.viewAll}</span>
        </button>
      )}

      <div className={styles.grid}>
        {projects.map((project, i) => {
          const matches = selectedSkill
            ? project.tags.some((tag) => skillMatchesTag(selectedSkill, tag))
            : true;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              spanClass={bentoPattern[i % bentoPattern.length]}
              isFiltering={!!selectedSkill}
              isMatch={matches}
              onOpen={() => setActiveProject(project)}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} ui={ui} />
        )}
      </AnimatePresence>
    </section>
  );
}