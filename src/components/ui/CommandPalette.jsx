import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { usePortfolioData } from '../../data/portfolioData';
import styles from './CommandPalette.module.css';

export default function CommandPalette({ open, setOpen, selectedSkill, onClearSkill }) {
  const { language, toggleLanguage } = useLanguage();
  const { playClick, muted, toggleMuted } = useSoundEffects();
  const { personal, ui } = usePortfolioData();

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setCopied(false);
      document.body.style.overflow = 'hidden';
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    document.body.style.overflow = '';
  }, [open]);

  function scrollToSection(href) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const commands = useMemo(() => {
    const nav = ui.nav.links.map((l) => ({
      id: `nav-${l.href}`,
      category: ui.commandPalette.navigation,
      label: l.label,
      hint: l.href,
      run: () => scrollToSection(l.href),
    }));

    const prefs = [
      {
        id: 'toggle-lang',
        category: ui.commandPalette.preferences,
        label: language === 'es' ? ui.commandPalette.switchToEnglish : ui.commandPalette.switchToSpanish,
        hint: 'ES / EN',
        run: () => toggleLanguage(),
      },
      {
        id: 'toggle-mute',
        category: ui.commandPalette.preferences,
        label: muted ? ui.commandPalette.unmute : ui.commandPalette.mute,
        hint: '♪',
        run: () => toggleMuted(),
      },
    ];

    if (selectedSkill) {
      prefs.push({
        id: 'clear-skill',
        category: ui.commandPalette.preferences,
        label: `${ui.skills.clearFilter} (${selectedSkill})`,
        hint: '✕',
        run: () => onClearSkill?.(),
      });
    }

    const contacts = [
      {
        id: 'copy-email',
        category: ui.commandPalette.contacts,
        label: ui.commandPalette.copyEmail,
        hint: personal.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(personal.email);
            setCopied(true);
          } catch {
            /* noop */
          }
        },
      },
      {
        id: 'open-github',
        category: ui.commandPalette.contacts,
        label: ui.commandPalette.openGithub,
        hint: 'GitHub ↗',
        run: () => window.open(personal.github, '_blank', 'noreferrer'),
      },
      {
        id: 'open-linkedin',
        category: ui.commandPalette.contacts,
        label: ui.commandPalette.openLinkedin,
        hint: 'LinkedIn ↗',
        run: () => window.open(personal.linkedin, '_blank', 'noreferrer'),
      },
    ];

    return [...nav, ...prefs, ...contacts];
  }, [ui, language, muted, selectedSkill, personal, toggleLanguage, toggleMuted, onClearSkill]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((c) => {
      if (!map.has(c.category)) map.set(c.category, []);
      map.get(c.category).push(c);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function executeCommand(cmd) {
    if (!cmd) return;
    playClick();
    cmd.run();
    if (cmd.id === 'copy-email') {
      setTimeout(() => setOpen(false), 650);
    } else {
      setOpen(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(filtered[activeIndex]);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.searchRow}>
              <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={ui.commandPalette.placeholder}
                aria-label={ui.commandPalette.placeholder}
              />
              <kbd className={styles.escHint}>ESC</kbd>
            </div>

            <div className={styles.list}>
              {grouped.length === 0 && <p className={styles.empty}>{ui.commandPalette.noResults}</p>}
              {grouped.map(([category, items]) => (
                <div key={category} className={styles.group}>
                  <p className={styles.groupLabel}>{category}</p>
                  {items.map((cmd) => {
                    const globalIndex = filtered.indexOf(cmd);
                    const isActive = globalIndex === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        onClick={() => executeCommand(cmd)}
                      >
                        <span>{cmd.label}</span>
                        <span className={styles.itemHint}>
                          {cmd.id === 'copy-email' && copied ? ui.commandPalette.emailCopied : cmd.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}