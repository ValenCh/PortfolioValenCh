import styles from './Button.module.css';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
}) {
  const { playClick } = useSoundEffects();
  const cls = `${styles.btn} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  function handleClick(e) {
    if (disabled) return;
    playClick();
    onClick?.(e);
  }

  if (href) {
      return (
        <a
          href={href}
          className={cls}
          onClick={handleClick}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
          {children}
        </a>
      );
    }

  return (
    <button className={cls} onClick={handleClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
} 