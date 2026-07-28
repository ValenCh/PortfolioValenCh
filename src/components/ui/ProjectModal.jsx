import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose, ui }) {
  const { playClick } = useSoundEffects();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  function handleClose() {
    playClick();
    onClose();
  }

  function handleActionClick() {
    playClick();
  }

  const architecture = project.architecture || {};

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleClose}
    >
      <motion.div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={handleClose} aria-label={ui.projects.close}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.header}>
          <span className={styles.icon} aria-hidden="true">{project.icon}</span>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            <div className={styles.meta}>
              {project.role && <span>{ui.projects.role}: {project.role}</span>}
              {project.date && <span>{ui.projects.date}: {project.date}</span>}
            </div>
          </div>
        </div>

        <p className={styles.desc}>{project.longDescription || project.description}</p>

        <div className={styles.archSection}>
          <p className={styles.archLabel}>{ui.projects.architecture}</p>
          <div className={styles.archRow}>
            <div className={styles.archBox}>
              <span className={styles.archTag}>Frontend</span>
              <span className={styles.archValue}>{architecture.frontend || '—'}</span>
            </div>
            <span className={styles.archArrow} aria-hidden="true">→</span>
            <div className={styles.archBox}>
              <span className={styles.archTag}>API</span>
              <span className={styles.archValue}>{architecture.api || '—'}</span>
            </div>
            <span className={styles.archArrow} aria-hidden="true">→</span>
            <div className={styles.archBox}>
              <span className={styles.archTag}>DB</span>
              <span className={styles.archValue}>{architecture.database || '—'}</span>
            </div>
          </div>
        </div>

        <div className={styles.tags}>
          {project.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>

        <div className={styles.actions}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className={styles.primaryBtn} onClick={handleActionClick}>
              {ui.projects.liveDemo} →
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className={styles.outlineBtn} onClick={handleActionClick}>
              {ui.projects.repo}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}