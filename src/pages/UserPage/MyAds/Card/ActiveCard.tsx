import React from 'react';
import Card from './Card/Card';
import styles from '../MyAds.module.scss';

export const qntActive = dataArray.length;
const ActiveCard: React.FC = () => {

    return (
        <div>
            {dataArray.length > 0 ? (
                dataArray.map((data, index) => (
                    <Card key={index} data={data} />
                ))
            ) : (
                <p className={styles.empty}>На даний момент відсутні активні оголошення</p>
            )}
        </div>
    );
};

export default ActiveCard;