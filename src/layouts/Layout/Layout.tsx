import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import styles from './Layout.module.scss';

export const Layout: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header />

            <main className={styles.main}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
