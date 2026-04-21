import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
}) {
  const cls = `${styles.btn} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}