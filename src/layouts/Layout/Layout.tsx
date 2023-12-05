import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../modules/Footer/Footer';

import styles from './Layout.module.scss';
import { Header } from 'modules/Header/Header';

export const Layout: FC = () => {
  const location = useLocation();
  const path = location.pathname;

    return (
    <div className={styles.wrapper}>
      {!path.startsWith('/login') && <Header />}
      <main className={styles.main}>
          <Outlet />
      </main>

      {!path.startsWith('/login') && <Footer />}
    </div>
    );
};
