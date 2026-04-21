import { motion } from 'framer-motion';
import { skillCategories, interests } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import SkillBar from '../ui/SkillBar';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <SectionTitle
        tag="// skills"
        title="Tecnologías & herramientas"
        subtitle="Las herramientas que uso hoy y las áreas en las que quiero seguir creciendo."
      />

      <div className={styles.grid}>
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.id}
            className={styles.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: ci * 0.1 }}
          >
            <div className={styles.catHeader}>
              {/*
                FIX: en lugar de style={{ background: cat.color }} con hex hardcodeado,
                usamos una CSS variable definida en variables.css.
                colorVar en portfolioData es p.ej. '--accent', '--cyan', '--green'.
              */}
              <span
                className={styles.catDot}
                style={{ background: `var(${cat.colorVar})` }}
                aria-hidden="true"
              />
              <span className={styles.catTitle}>{cat.title}</span>
            </div>
            <div className={styles.skillList}>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={ci * 0.1 + si * 0.07}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.interests}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className={styles.interestLabel}>Áreas de interés y crecimiento</p>
        <div className={styles.chips}>
          {interests.map((interest) => (
            <span key={interest} className={styles.chip}>{interest}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}