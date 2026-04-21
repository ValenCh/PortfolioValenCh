import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ tag, title, subtitle }) {
  return (
    <div className={styles.wrapper}>
      {tag && <span className={styles.tag}>{tag}</span>}
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}