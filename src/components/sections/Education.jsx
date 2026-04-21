import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className={`section ${styles.education}`}>
      <SectionTitle tag="// educación" title="Formación" />
      <div className={styles.grid}>
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className={styles.icon} aria-hidden="true">{item.icon}</span>
            <p className={styles.degree}>{item.degree}</p>
            <p className={styles.school}>{item.school}</p>
            <p className={styles.period}>{item.period}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}