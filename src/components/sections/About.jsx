import { motion } from 'framer-motion';
import { usePortfolioData } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import styles from './About.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 90, damping: 22, delay: i * 0.07 },
  }),
};

export default function About() {
  const { personal, stats, ui } = usePortfolioData();

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.bentoGrid}>
        <motion.div
          className={`${styles.bentoBlock} ${styles.blockBio}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 90, damping: 22 }}
        >
          <SectionTitle tag={ui.about.tag} title={ui.about.title} />
          {personal.bio.map((paragraph, i) => (
            <motion.p
              key={paragraph.slice(0, 40)}
              className={styles.bio}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: i * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
          <motion.div
            className={styles.location}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {personal.location}
          </motion.div>
        </motion.div>

        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              className={`${styles.bentoBlock} ${styles.statCard}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={styles.statInner}>
                <div className={styles.statNum}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}