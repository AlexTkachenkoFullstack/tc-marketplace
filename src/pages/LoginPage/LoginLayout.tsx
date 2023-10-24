import { FC } from 'react';
import styles from './LoginLayout.module.scss';

import { NavLink, Outlet } from 'react-router-dom';
import { Logo } from 'components/Logo';

export const LoginLayout: FC = () => {

  return (
    <div className={styles.Container}>
      <nav className={styles.nav}>
        <NavLink to="/"><Logo className={styles.nav_logo} /></NavLink>
        <NavLink to="/" className={styles.nav_text}>Вихід</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};
