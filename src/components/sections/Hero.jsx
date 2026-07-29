import { motion } from 'framer-motion';
import { usePortfolioData } from '../../data/portfolioData';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const reveal = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 22 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 22 } },
};

export default function Hero() {
  const { personal, heroChips, ui } = usePortfolioData();

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.radialGlow} aria-hidden="true" />
      <div className={styles.radialGlow2} aria-hidden="true" />

      <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className={styles.badgeWrap}>
          <span className={styles.badge}>
            <span className={styles.pulse} aria-hidden="true" />
            {personal.available ? ui.hero.badgeAvailable : ui.hero.badgeUnavailable}
          </span>
        </motion.div>

        <div className={styles.headingMask}>
          <motion.p variants={reveal} className={styles.headingPre}>{ui.hero.pre}</motion.p>
        </div>
        <div className={styles.headingMask}>
          <motion.h1 variants={reveal} className={styles.heading}>{personal.name}</motion.h1>
        </div>

        <motion.p variants={fadeUp} className={styles.sub}>{personal.tagline}</motion.p>

        <motion.div variants={fadeUp} className={styles.actions}>
          <Button href="#projects" variant="primary">{ui.hero.ctaProjects}</Button>
          <Button href="#contact" variant="outline">{ui.hero.ctaContact}</Button>
        </motion.div>

        <motion.div variants={fadeUp} className={styles.chips} aria-label="Tecnologías">
          {heroChips.map((chip, i) => (
            <motion.span
              key={chip}
              className={styles.chip}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span>{ui.hero.scrollHint}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}