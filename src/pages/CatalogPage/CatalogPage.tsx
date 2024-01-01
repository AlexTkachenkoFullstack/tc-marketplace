import { FC } from 'react';
import styles from './CatalogPage.module.scss';
import { Filters } from 'modules/Filters/Filters';
import Catalog from 'modules/Catalog/Catalog';

export const CatalogPage: FC = () => {
    return (
        <div className={styles.Container}>
          <Filters />
          <Catalog />
        </div>
    );
};
