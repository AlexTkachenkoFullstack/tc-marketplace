import React, { useState } from 'react';
import styles from './AdvancedSearch.module.scss';
import { SearchTop } from '../../components/SearchTop/SearchTop'
import InputRange from 'components/RangeInput/InputRange';

export const AdvancedSearch: React.FC = () => {
    const [minPrice, setMinPrice] = useState(100)
    const [maxPrice, setMaxPrice] = useState(2000)



    return (
        <div className={styles.AdvSearch}>
            <div className={styles.AdvSearch_container}>
                <h1 className={styles.AdvSearch_title}>Розширений пошук</h1>
                <SearchTop />
                <InputRange
                    title='input title'
                    min={100}
                    max={10000}
                    minDistance={100}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    placeholder='$'
                    setMinValue={(newValue: number) => {
                        setMinPrice(newValue)
                    }}
                    setMaxValue={(newValue: number) => {
                        setMaxPrice(newValue)
                    }}
                />
            </div>
        </div>
    );
};

