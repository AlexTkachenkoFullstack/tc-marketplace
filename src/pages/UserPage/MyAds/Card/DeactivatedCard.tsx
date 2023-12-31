import React from 'react';
import Card from './Card/Card';
import styles from '../MyAds.module.scss';
import { IAd } from 'types/IAd';

interface IDeactivatedCarsProps {
  cars: IAd[];
}
const DeactivatedCard: React.FC<IDeactivatedCarsProps> = ({cars}) =>{
  
  return (
    <div>
      {cars.length > 0 ? (
        cars.map(car => (
          <Card key={car.id} car={car} />
        ))
      ) : (
        <p className={styles.empty}>На даний момент відсутні деактивовані оголошення</p>
      )}
    </div>
  );
};

export default DeactivatedCard;