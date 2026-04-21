import { motion } from 'framer-motion';
import { personal, heroChips } from '../../data/portfolioData';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  return (
    // FIX: sin className "section" — esa clase aplica max-width + margin auto
    // que recortaba el hero. El ancho lo maneja Hero.module.css directamente.
    <section id="hero" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className={styles.badge}>
          <span className={styles.pulse} aria-hidden="true" />
          {personal.available ? 'Disponible para trabajar' : 'No disponible actualmente'}
        </motion.div>

        <motion.h1 variants={item} className={styles.heading}>
          Hola, soy<br />
          <span className={styles.nameGradient}>{personal.name}</span>
        </motion.h1>

        <motion.p variants={item} className={styles.sub}>
          {personal.tagline}
        </motion.p>

        <motion.div variants={item} className={styles.actions}>
          <Button href="#projects" variant="primary">Ver proyectos →</Button>
          <Button href="#contact" variant="outline">Contactarme</Button>
        </motion.div>

        <motion.div variants={item} className={styles.chips} aria-label="Tecnologías">
          {heroChips.map((chip) => (
            <span key={chip} className={styles.chip}>{chip}</span>
          ))}
        </motion.div>

        <motion.div variants={item} className={styles.scroll} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span>Scroll para explorar</span>
        </motion.div>
      </motion.div>
    </section>
  );
}