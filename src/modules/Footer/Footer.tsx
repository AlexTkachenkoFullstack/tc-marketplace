import React from 'react';
import '../../styles/blocks/_container.scss';
import styles from './Footer.module.scss';

import { Logo } from 'components/Logo';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <Logo />

          <div className={styles.contacts}>
            <NavLink
              to={'https://www.facebook.com/'}
              target='_blank'
              className={styles.contact}
            >
              Facebook
            </NavLink>

            <NavLink
              to={'https://www.instagram.com/'}
              target='_blank'
              className={styles.contact}
            >
              Instagram
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
