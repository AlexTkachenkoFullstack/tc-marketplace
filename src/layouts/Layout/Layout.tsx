import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import styles from './Layout.module.scss';

export const Layout: FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        {!path.startsWith('/login') && <Header />}
      </section>
      <main className={styles.main}>
        <Outlet />
      </main>
      {!path.startsWith('/login') && <Footer />}
    </div>
  );
};
