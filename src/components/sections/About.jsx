import { motion } from 'framer-motion';
import { personal, stats } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <SectionTitle tag="// sobre mí" title="Más que código, soluciones que funcionan" />
          {personal.bio.map((paragraph, i) => (
            <motion.p
              key={paragraph.slice(0, 40)}
              className={styles.bio}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {personal.location}
          </motion.div>
        </div>

        <div className={styles.right}>
          {stats.map((s, i) => (
            // FIX: eliminado whileHover de Framer Motion.
            // El hover ahora lo maneja CSS con transition en About.module.css,
            // lo que hace que el borde aparezca instantáneamente al pasar el mouse.
            <motion.div
              key={s.id}
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className={styles.statNum}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}