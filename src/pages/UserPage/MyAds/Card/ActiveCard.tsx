import React from 'react';
import Card from './Card/Card';
import styles from '../MyAds.module.scss';
import { IAd } from 'types/IAd';

interface ActiveCardProps {
  cars: IAd[];
}
const ActiveCard: React.FC<ActiveCardProps> = ({cars}) =>{
  return (
    <div>
      {cars.length > 0 ? (
        cars.map(car => (
          <Card key={car.id} car={car} />
        ))
      ) : (
        <p className={styles.empty}>На даний момент відсутні активні оголошення</p>
      )}
    </div>
  );
};

export default ActiveCard;