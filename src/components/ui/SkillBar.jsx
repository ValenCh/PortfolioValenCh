import { motion } from 'framer-motion';
import styles from './SkillBar.module.css';

export default function SkillBar({ name, level, delay = 0 }) {
  return (
    <div className={styles.item}>
      <div className={styles.meta}>
        <span className={styles.name}>{name}</span>
        <span className={styles.level}>{level}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}