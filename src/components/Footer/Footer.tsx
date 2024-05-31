import React from 'react';
import '../../styles/blocks/_container.scss';
import styles from './Footer.module.scss';

import { Logo } from 'components/Logo';
import { NavLink } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Logo className="footer-logo" />

        <div className={styles.contacts}>
          <NavLink
            to={'https://www.facebook.com/'}
            target="_blank"
            className={styles.contact}
          >
            Facebook
          </NavLink>

          <NavLink
            to={'https://www.instagram.com/'}
            target="_blank"
            className={styles.contact}
          >
            Instagram
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
