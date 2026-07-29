import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

function SpeakerIcon({ muted }) {
  if (muted) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M18.36 5.64a9 9 0 0 1 0 12.72" />
    </svg>
  );
}

export default function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(null);
  const { ui } = usePortfolioData();
  const { language, setLanguage } = useLanguage();
  const { playClick, muted, toggleMuted } = useSoundEffects();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleNavClick() {
    playClick();
    setMenuOpen(false);
  }

  function handleLangClick(lang) {
    if (lang === language) return;
    playClick();
    setLanguage(lang);
  }

  function handleMuteClick() {
    playClick();
    toggleMuted();
  }

  function handlePaletteClick() {
    playClick();
    onOpenPalette?.();
  }

  const muteLabel = muted ? ui.commandPalette.unmute : ui.commandPalette.mute;

  return (
    <header className={styles.header}>
      <div className={`${styles.island} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#hero" className={styles.logo} aria-label="Ir al inicio" onClick={handleNavClick}>
          VCh<span className={styles.dot}>.</span>
        </a>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.links}>
            {ui.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`${styles.link} ${activeHref === l.href ? styles.linkActive : ''}`}
                  onMouseEnter={() => setActiveHref(l.href)}
                  onMouseLeave={() => setActiveHref(null)}
                  onClick={handleNavClick}
                >
                  {activeHref === l.href && (
                    <motion.span
                      className={styles.pill}
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={styles.linkText}>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tools}>
          <div className={styles.langSwitch} role="group" aria-label="Idioma">
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'es' ? styles.langBtnActive : ''}`}
              onClick={() => handleLangClick('es')}
            >
              ES
            </button>
            <span className={styles.langDivider} aria-hidden="true">|</span>
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'en' ? styles.langBtnActive : ''}`}
              onClick={() => handleLangClick('en')}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleMuteClick}
            aria-label={muteLabel}
            title={muteLabel}
          >
            <SpeakerIcon muted={muted} />
          </button>

          <button type="button" className={styles.paletteBadge} onClick={handlePaletteClick} aria-label="Abrir paleta de comandos">
            <span>⌘</span>K
          </button>
        </div>

        <div className={styles.cta}>
          <Button href="#contact" variant="primary">{ui.nav.cta}</Button>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobile}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {ui.nav.links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className={styles.mobileLink}
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 28 }}
              >
                {l.label}
              </motion.a>
            ))}

            <div className={styles.mobileTools}>
              <div className={styles.langSwitch} role="group" aria-label="Idioma">
                <button type="button" className={`${styles.langBtn} ${language === 'es' ? styles.langBtnActive : ''}`} onClick={() => handleLangClick('es')}>ES</button>
                <span className={styles.langDivider} aria-hidden="true">|</span>
                <button type="button" className={`${styles.langBtn} ${language === 'en' ? styles.langBtnActive : ''}`} onClick={() => handleLangClick('en')}>EN</button>
              </div>
              <button type="button" className={styles.iconBtn} onClick={handleMuteClick} aria-label={muteLabel}>
                <SpeakerIcon muted={muted} />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: ui.nav.links.length * 0.05 }}
              style={{ marginTop: '0.5rem' }}
            >
              <Button href="#contact" variant="primary">{ui.nav.cta}</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}