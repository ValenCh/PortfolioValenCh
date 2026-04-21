import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <SectionTitle tag="// experiencia" title="Mi trayectoria" />
      <div className={styles.timeline}>
        {experience.map((item, i) => (
          <motion.div
            key={item.id}
            className={styles.item}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={styles.dot} />
            <div className={styles.body}>
              <span className={styles.date}>{item.period}</span>
              <h3 className={styles.role}>{item.role}</h3>
              <p className={styles.company}>{item.company}</p>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.tags}>
                {item.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}