import React, { useState } from 'react';
import styles from './Card.module.scss';
import eye from '../../../../../assets/icons/eye-open.svg';
import empty from '../../../../../assets/icons/empty_icon.svg';
import favorite from '../../../../../assets/icons/favorite.svg';
import clock from '../../../../../assets/icons/clock.svg';
import { convertDate } from 'utils/convertDate';
import { IAd } from 'types/IAd';
import { countViews } from 'utils/countViews';
import { countShows } from 'utils/countShows';

export interface CardProps {
  car: IAd
}

const Card: React.FC<CardProps> = ({ car }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  convertDate(car.created)
  const handleButtonClick = () => {
    setIsButtonActive(!isButtonActive);
  };

  return (
    <div>
      <div className={styles.card}>
        <img src={car.fileUrl} alt={car.brand} className={styles.card_img} />
        <div className={styles.card_info}>
          <div className={styles.card_info_top}>
            <h3 className={styles.card_info_title}>{car.brand} {car.model} {car.year}</h3>
            <p className={styles.card_info_price}>{car.price} $</p>
            <div className={styles.card_info_meta}>
              <div className={styles.card_info_views}>
                <img className={styles.icon} src={eye} alt="Eye icon" />
                <p className={styles.card_info_data}>{`${car.viewCount} ${countViews(car.viewCount)}`}</p>
              </div>
              <div className={styles.card_info_phoneViews}>
                <img className={styles.icon} src={empty} alt="Empty icon" />
                <p className={styles.card_info_data}>{`${car.openedPhoneCount || 0} ${countShows(car.openedPhoneCount)} телефону`}</p>
              </div>
              <div className={styles.card_info_likes}>
                <img className={styles.icon} src={favorite} alt="Favorite icon" />
                <p className={styles.card_info_data}>{car.addedFavoriteCount}</p>
              </div>
              <div className={styles.card_info_createdAt}>
                <img className={styles.icon} src={clock} alt="Clock icon" />
                <p className={styles.card_info_data}>{convertDate(car.created)}</p>
              </div>
              {car.created!==car.lastUpdated && 
              <div className={styles.card_info_updatedAt}>
                <img className={styles.icon} src={clock} alt="Clock icon" />
                <p className={styles.card_info_data}>{convertDate(car.lastUpdated)}</p> 
              </div>
              }
            </div>
            <p className={styles.card_info_description}>{car.description}</p>
          </div>
          <div className={styles.card_buttons}>
            <button className={styles.button} onClick={handleButtonClick}>
              Редагувати
            </button>
            <button className={styles.button}>Видалити</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;





