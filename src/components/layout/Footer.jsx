import { usePortfolioData } from '../../data/portfolioData';
import styles from './Footer.module.css';

export default function Footer() {
  const { personal, ui } = usePortfolioData();
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          {ui.footer.designedBy}{' '}
          <span className={styles.name}>{personal.name}</span>{' '}
          · {year}
        </p>
        <div className={styles.links}>
          <a href={personal.github} target="_blank" rel="noreferrer" className={styles.link}>GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.link}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}