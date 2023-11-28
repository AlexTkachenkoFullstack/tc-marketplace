import React, { useState } from 'react';
import React, { useState } from 'react';
import styles from './AdvancedSearch.module.scss';
import { SearchTop } from '../../components/SearchTop/SearchTop'

export const AdvancedSearch: React.FC = () => {


    return (
        <div className={styles.AdvSearch}>
            <div className={styles.AdvSearch_container}>
                <h1 className={styles.AdvSearch_title}>Розширений пошук</h1>
                <SearchTop />
            </div>
        </div>
    );
};

