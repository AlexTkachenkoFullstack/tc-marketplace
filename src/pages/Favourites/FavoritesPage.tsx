import { FC } from 'react';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
    return (
        <div className={`${styles.Container}`}>
        <h2 className={styles.emptyFavorite}>
          There are no items in your favorite 🧐
        </h2>
        </div>
    );
};
