import React from 'react';
import Card, {CardProps} from './Card/Card';
import styles from '../MyAds.module.scss';

const dataArray: CardProps['data'][] = [];

export const qntPending = dataArray.length;
const PendingCard: React.FC = () =>{
  
  return (
    <div>
      {dataArray.length > 0 ? (
        dataArray.map((data, index) => (
          <Card key={index} data={data} />
        ))
      ) : (
        <p className={styles.empty}>На даний момент відсутні оголошення</p>
      )}
    </div>
  );
};

export default PendingCard;