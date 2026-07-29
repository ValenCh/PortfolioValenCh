import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { loadFirebaseAuth } from '../../firebase';
import { useReveal } from '../../hooks/useInView';
import { usePortfolioData } from '../../data/portfolioData';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import styles from './Contact.module.css';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// SEGURIDAD: estos tres valores viajan igual en el bundle público, sea cual
// sea el nombre de la variable. El requisito de "iniciar sesión con Google"
// de abajo es UX, no control de acceso: nada impide llamar a la API de
// EmailJS directamente con estos mismos IDs sin pasar por el login.
// El control de acceso real se configura en EmailJS → Account → Security →
// "Allowed origins" (restringir al dominio de producción del sitio).
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

const formContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const formField = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 22 } },
};

export default function Contact() {
  const { personal, ui } = usePortfolioData();
  const { playClick } = useSoundEffects();
  const formRef = useRef(null);

  // Dispara la carga de Firebase Auth ~600px antes de que la sección sea
  // visible, para que al llegar el usuario scrolleando ya esté resuelto.
  const { ref: sectionRef, inView: nearContact } = useReveal({ rootMargin: '600px 0px', triggerOnce: true });
  const [authApi, setAuthApi] = useState(null);

  const [user, setUser]               = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signing, setSigning]         = useState(false);
  const [sent, setSent]               = useState(false);
  const [sending, setSending]         = useState(false);
  const [error, setError]             = useState(false);

  const contactLinks = [
    {
      id: 'email',
      label: personal.email,
      href: `mailto:${personal.email}`,
      external: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: 'linkedin.com/in/valentino',
      href: personal.linkedin,
      external: true,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      id: 'github',
      label: 'github.com/ValenCh',
      href: personal.github,
      external: true,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
  ];

  // Se dispara solo cuando la sección se acerca al viewport.
  useEffect(() => {
    if (!nearContact) return;
    let cancelled = false;
    let unsub;
    loadFirebaseAuth().then((api) => {
      if (cancelled) return;
      setAuthApi(api);
      unsub = api.onAuthStateChanged(api.auth, (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      });
    });
    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, [nearContact]);

  useEffect(() => {
    if (!sent) return;
    const id = setTimeout(() => setSent(false), 5000);
    return () => clearTimeout(id);
  }, [sent]);

  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(false), 5000);
    return () => clearTimeout(id);
  }, [error]);

  async function handleGoogleLogin() {
    if (!authApi) return;
    playClick();
    setSigning(true);
    try {
      await authApi.signInWithPopup(authApi.auth, authApi.provider);
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setSigning(false);
    }
  }

  async function handleLogout() {
    if (!authApi) return;
    playClick();
    await authApi.signOut(authApi.auth);
    formRef.current?.reset();
    setSent(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setSending(true);
    setError(false);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setSent(true);
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={sectionRef}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 90, damping: 22 }}
        >
          <SectionTitle tag={ui.contact.tag} title={ui.contact.title} />
          <p className={styles.intro}>{ui.contact.intro}</p>
          <div className={styles.links}>
            {contactLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                className={styles.link}
                onClick={playClick}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 90, damping: 22, delay: i * 0.08 }}
              >
                <span className={styles.linkIcon}>{l.icon}</span>
                <span>{l.label}</span>
                <svg className={styles.arrow} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.12 }}
        >
          <AnimatePresence mode="wait">
            {authLoading && (
              <motion.div key="loading" className={styles.glassCard}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className={styles.authHint}>{ui.contact.verifyingSession}</p>
              </motion.div>
            )}

            {!authLoading && !user && (
              <motion.div
                key="login"
                className={styles.glassCard}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              >
                <motion.div
                  className={styles.lockIcon}
                  aria-hidden="true"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="11" width="14" height="10" rx="2"/>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                    <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </motion.div>

                <p className={styles.authTitle}>{ui.contact.authTitle}</p>
                <p className={styles.authHint}>{ui.contact.authHint}</p>

                <button className={styles.googleBtn} onClick={handleGoogleLogin} disabled={signing || !authApi}>
                  <GoogleIcon />
                  {signing ? ui.contact.googleBtnLoading : ui.contact.googleBtn}
                </button>

                <div className={styles.formPreview} aria-hidden="true">
                  <div className={styles.previewRow}>
                    <div className={styles.previewField} />
                    <div className={styles.previewField} />
                  </div>
                  <div className={`${styles.previewField} ${styles.previewTextarea}`} />
                  <div className={styles.previewBtn} />
                </div>
              </motion.div>
            )}

            {!authLoading && user && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              >
                <div className={styles.userBadge}>
                  <img src={user.photoURL} alt={user.displayName} className={styles.userAvatar} referrerPolicy="no-referrer" />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.displayName}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                  <button className={styles.logoutBtn} onClick={handleLogout}>{ui.contact.logout}</button>
                </div>

                <motion.form
                  ref={formRef}
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  variants={formContainer}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={formField} className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name" className={styles.label}>{ui.contact.nameLabel}</label>
                      <input id="contact-name" name="name" className={styles.input} type="text"
                             defaultValue={user.displayName} autoComplete="name" required
                             maxLength={MAX_NAME_LENGTH} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-email" className={styles.label}>{ui.contact.emailLabel}</label>
                      <input id="contact-email" name="email" className={styles.input} type="email"
                             defaultValue={user.email} autoComplete="email" required />
                    </div>
                  </motion.div>

                  <motion.div variants={formField} className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>{ui.contact.messageLabel}</label>
                    <textarea id="contact-message" name="message" className={`${styles.input} ${styles.textarea}`}
                              placeholder={ui.contact.messagePlaceholder} required
                              maxLength={MAX_MESSAGE_LENGTH} />
                  </motion.div>

                  {sent && (
                    <motion.p className={styles.successMsg} role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      {ui.contact.successMsg}
                    </motion.p>
                  )}
                  {error && (
                    <motion.p className={styles.errorMsg} role="alert" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      {ui.contact.errorMsg}
                    </motion.p>
                  )}

                  <motion.div variants={formField}>
                    <Button type="submit" variant="primary" disabled={sending || sent}>
                      {sending ? ui.contact.sending : sent ? ui.contact.sent : ui.contact.send}
                    </Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}