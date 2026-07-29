import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index, spanClass, isFiltering, isMatch, onOpen }) {
  const cardRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const { playClick } = useSoundEffects();

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, opacity: 1 });
  }

  function handleMouseLeave() {
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  }

  function handleCardClick() {
    playClick();
    onOpen?.();
  }

  function handleCardKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    playClick();
  }

  const stateClass = isFiltering ? (isMatch ? styles.highlighted : styles.dimmed) : '';

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${spanClass || ''} ${stateClass}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 90, damping: 22, delay: index * 0.07 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.cursorGlow}
        style={{
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, var(--brand-glow), transparent 70%)`,
          opacity: glow.opacity,
        }}
        aria-hidden="true"
      />

<div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">{project.icon}</span>
        <div className={styles.linkGroup}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
              aria-label={`Ver código de ${project.title} en GitHub`}
              onClick={handleLinkClick}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
              aria-label={`Ver demo de ${project.title}`}
              onClick={handleLinkClick}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.description}</p>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {project.tags.map((tag, i) => (
            <span key={tag} className={styles.tag}>
              {i > 0 && <span className={styles.tagDot} aria-hidden="true" />}
              {tag}
            </span>
          ))}
        </div>
        <span className={styles.expandCue} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}