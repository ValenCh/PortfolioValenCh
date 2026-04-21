import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import emailjs from '@emailjs/browser';
import { auth, provider } from '../../firebase';
import { personal } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import styles from './Contact.module.css';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactLinks = [
  {
    id: 'email',
    label: personal.email,
    href: `mailto:${personal.email}`,
    external: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'github.com/valentino',
    href: personal.github,
    external: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [user, setUser]               = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signing, setSigning]         = useState(false);
  const [sent, setSent]               = useState(false);
  const [sending, setSending]         = useState(false);
  const [error, setError]             = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

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
    setSigning(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setSigning(false);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    formRef.current?.reset();
    setSent(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setSending(true);
    setError(false);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
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
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={styles.wrapper}>

        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle tag="// contacto" title="¿Hablamos?" />
          <p className={styles.intro}>
            Estoy buscando mi primera experiencia laboral. Si tu equipo busca alguien
            con ganas de aprender, crecer y aportar valor desde el día uno,
            me encantaría conocerlos.
          </p>
          <div className={styles.links}>
            {contactLinks.map((l) => (
              <a
                key={l.id}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                className={styles.link}
              >
                <span className={styles.linkIcon}>{l.icon}</span>
                <span>{l.label}</span>
                <svg className={styles.arrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">

            {/* Cargando estado de auth */}
            {authLoading && (
              <motion.div key="loading" className={styles.authBox}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className={styles.authHint}>Verificando sesión...</p>
              </motion.div>
            )}

            {/* No autenticado */}
            {!authLoading && !user && (
              <motion.div key="login" className={styles.authBox}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

                <div className={styles.authIcon} aria-hidden="true">🔒</div>
                <p className={styles.authTitle}>Autenticación requerida</p>
                <p className={styles.authHint}>
                  Para enviar un mensaje necesitás iniciar sesión con Google.
                  Esto evita spam y me asegura poder responderte.
                </p>

                <button
                  className={styles.googleBtn}
                  onClick={handleGoogleLogin}
                  disabled={signing}
                >
                  <GoogleIcon />
                  {signing ? 'Conectando...' : 'Continuar con Google'}
                </button>

                {/* Formulario visible pero bloqueado */}
                <div className={styles.formDisabled} aria-hidden="true">
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <span className={styles.label}>Nombre</span>
                      <div className={`${styles.input} ${styles.inputFake}`} />
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>Email</span>
                      <div className={`${styles.input} ${styles.inputFake}`} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Mensaje</span>
                    <div className={`${styles.input} ${styles.textarea} ${styles.inputFake}`} />
                  </div>
                  <Button type="button" variant="primary" disabled>Enviar mensaje →</Button>
                </div>
              </motion.div>
            )}

            {/* Autenticado */}
            {!authLoading && user && (
              <motion.div key="form"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

                {/* Badge usuario */}
                <div className={styles.userBadge}>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className={styles.userAvatar}
                    referrerPolicy="no-referrer"
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.displayName}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    Salir
                  </button>
                </div>

                <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name" className={styles.label}>Nombre</label>
                      <input
                        id="contact-name" name="name"
                        className={styles.input} type="text"
                        defaultValue={user.displayName}
                        autoComplete="name" required
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-email" className={styles.label}>Email</label>
                      <input
                        id="contact-email" name="email"
                        className={styles.input} type="email"
                        defaultValue={user.email}
                        autoComplete="email" required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>Mensaje</label>
                    <textarea
                      id="contact-message" name="message"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Hola Valentino..." required
                    />
                  </div>

                  {sent && (
                    <p className={styles.successMsg} role="status">
                      ✓ Mensaje enviado. Te respondo a la brevedad.
                    </p>
                  )}
                  {error && (
                    <p className={styles.errorMsg} role="alert">
                      ✗ Error al enviar. Intentá de nuevo o escribime al email directamente.
                    </p>
                  )}

                  <Button type="submit" variant="primary" disabled={sending || sent}>
                    {sending ? 'Enviando...' : sent ? '✓ Enviado' : 'Enviar mensaje →'}
                  </Button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}