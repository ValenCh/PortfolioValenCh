import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../../data/portfolioData';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

const links = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* CAMBIO: VCh en lugar de VC */}
        <a href="#hero" className={styles.logo} aria-label="Ir al inicio">
          VCh<span className={styles.dot}>.</span>
        </a>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          <Button href="#contact" variant="primary">Hablemos</Button>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobile}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: '1rem' }}>
              <Button href="#contact" variant="primary">Hablemos</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}