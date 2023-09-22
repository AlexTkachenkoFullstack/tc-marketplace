import styles from './Footer.module.scss';
import { Logo } from 'components/Logo';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <div className={styles.contacts}>
        <button className={styles.contact}>Facebook</button>
        <button className={styles.contact}>Instagram</button>
      </div>
    </footer>
  );
};

export default Footer;
