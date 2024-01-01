import React, { useState } from 'react';
import styles from './Filters.module.scss';
import AdvanceFilters from './AdvancedFilter/AdvanceFilters';
import Catalog from 'modules/Catalog/Catalog';
import arrow from '../../assets/icons/arrow-down-grey.svg';

export const Filters: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.Filters}>
            <div className={styles.Filters_container}>
              <h1 className={styles.Filters_title}>Title</h1>
              <div className={styles.Filters_buttons}>
                <button className={styles.Filters_button}>Розширеный фільтр</button>
                <button className={styles.Filters_button}>
                  Спочатку нове
                  <img src={arrow}  alt=''/>
                </button>
              </div>
            </div>

            {isActive && <AdvanceFilters isActive={isActive} />}
            <Catalog></Catalog>
        </div>
    );
};

