import { FC } from 'react';
import styles from './CatalogPage.module.scss';
import { Filters } from 'modules/Filters/Filters';

export const CatalogPage: FC = () => {
    return (
        <div className={styles.Container}>
          <Filters />
        </div>
    );
};
