import { motion } from 'framer-motion';
import { usePortfolioData } from '../../data/portfolioData';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import SectionTitle from '../ui/SectionTitle';
import styles from './Skills.module.css';

const techIcons = {
  'HTML / CSS': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 3l1.5 17L12 22l7.5-2L21 3H3z"/>
      <path d="M17 8H7l.5 5h9l-.5 5-4 1-4-1-.25-3"/>
    </svg>
  ),
  'JavaScript': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 17c0 1 .7 1.5 1.5 1.5 1 0 1.5-.6 1.5-1.5V12H8v5zm5-5v3.5c0 .3.1.5.4.5s.6-.3.6-.5V12h2v3.8c0 1.5-1 2.2-2 2.2-1.2 0-2-.6-2.2-1.5L12 12z"/>
    </svg>
  ),
  'React': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="2"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/>
    </svg>
  ),
  'SASS': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 14.41c-.78.78-1.94 1.09-3.07.83l-.45-.1c-.64-.14-1.26-.4-1.77-.78l.7-.84c.38.27.82.46 1.27.56l.44.1c.63.14 1.27-.03 1.71-.47.44-.44.44-1.16 0-1.6-.22-.22-.54-.35-.87-.35-.64 0-1.14.5-1.14 1.14 0 .2.05.4.14.57l-.96.41c-.17-.33-.26-.7-.26-1.07 0-1.26 1.02-2.28 2.28-2.28.63 0 1.22.25 1.66.7.88.88.88 2.31 0 3.18z"/>
    </svg>
  ),
  'Python': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C8.13 2 8 4.02 8 5v1h8V5c0-1-.13-3-4-3z"/>
      <path d="M8 6v2c0 2-2 2-2 4s1 4 2 4h1v-4s-.5-2 3-2 3 2 3 2v4h1c1 0 2-2 2-4s-2-2-2-4V6H8z"/>
      <circle cx="10" cy="4.5" r=".75" fill="currentColor" stroke="none"/>
      <circle cx="14" cy="19.5" r=".75" fill="currentColor" stroke="none"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z"/>
      <path d="M12 2v20M3 7l9 5 9-5"/>
    </svg>
  ),
  'Java': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 14s-1 .3-1 1 1 1 1 1M6 18s4 1 6 0"/>
      <path d="M9 11c0 0 5-2 5 2s-5 2-5 2"/>
      <path d="M10 2c0 0 5 4 0 7"/>
    </svg>
  ),
  'C': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 8c-1.5-1.5-4-1-5 1s0 5 2 6 4 0 4 0"/>
      <circle cx="12" cy="12" r="9"/>
    </svg>
  ),
  'Git / GitHub': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
    </svg>
  ),
  'VS Code': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 3L4 14l5 3 11-8V5l-4-2z"/>
      <path d="M4 14l5 3v4l-5-3v-4z"/>
    </svg>
  ),
  'Linux': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="12" rx="2"/>
      <path d="M3 15h18M8 19h8M12 15v4"/>
    </svg>
  ),
  'Figma': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 3h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z"/>
      <path d="M8 11h4a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z"/>
      <circle cx="16" cy="15" r="4"/>
    </svg>
  ),
};

function levelOpacity(lvl) {
  if (lvl >= 80) return 1;
  if (lvl >= 55) return 0.65;
  return 0.38;
}

export default function Skills({ selectedSkill, onSelectSkill }) {
  const { skillCategories, interests, ui } = usePortfolioData();
  const { playClick } = useSoundEffects();

  function levelLabel(lvl) {
    if (lvl >= 80) return ui.skills.levels.advanced;
    if (lvl >= 55) return ui.skills.levels.intermediate;
    return ui.skills.levels.basic;
  }

  function handleSkillClick(name) {
    playClick();
    onSelectSkill?.(name);
  }

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <SectionTitle tag={ui.skills.tag} title={ui.skills.title} subtitle={ui.skills.subtitle} />

      <div className={styles.showcase}>
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.id}
            className={styles.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, damping: 22, delay: ci * 0.1 }}
          >
            <div className={styles.catHeader}>
              <span className={styles.catDot} style={{ background: `var(${cat.colorVar})` }} aria-hidden="true" />
              <span className={styles.catTitle}>{cat.title}</span>
            </div>

            <div className={styles.techGrid}>
              {cat.skills.map((skill, si) => {
                const icon = techIcons[skill.name];
                const opacity = levelOpacity(skill.level);
                const isSelected = selectedSkill === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    type="button"
                    className={`${styles.techCard} ${isSelected ? styles.techCardSelected : ''}`}
                    onClick={() => handleSkillClick(skill.name)}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20, delay: ci * 0.08 + si * 0.06 }}
                  >
                    {icon && (
                      <div className={styles.techIcon} style={{ opacity: isSelected ? 1 : opacity }}>
                        {icon}
                      </div>
                    )}
                    <span className={styles.techName} style={{ opacity: isSelected ? 1 : opacity }}>
                      {skill.name}
                    </span>
                    <span className={styles.techLevel}>{levelLabel(skill.level)}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.interests}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.3 }}
      >
        <p className={styles.interestLabel}>{ui.skills.interestsLabel}</p>
        <div className={styles.chips}>
          {interests.map((interest) => <span key={interest} className={styles.chip}>{interest}</span>)}
        </div>
      </motion.div>
    </section>
  );
}