import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';

import styles from './Card.module.scss';

import eye from '../../../../../assets/icons/eye-open.svg';
import phone from '../../../../../assets/icons/phone.svg';
import favorite from '../../../../../assets/icons/favorite.svg';
import clock from '../../../../../assets/icons/clock.svg';
import imagePlug from '../../../../../assets/images/imagePlug.webp';

import { convertDate } from 'utils/convertDate';
import { countViews } from 'utils/countViews';
import { countShows } from 'utils/countShows';

import { IAd } from 'types/IAd';

import {
  changeTransportStatus,
  fetchMyActiveAds,
  fetchMyAdsCount,
  fetchMyDeletedAds,
  fetchMyInactiveAds,
  fetchMyPendingAds,
} from 'redux/profile/operations';

export interface CardProps {
  car: IAd;
  advType?: number;
  onClickDelete?: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ car, advType, onClickDelete }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let firstButtonContent: string = 'Редагувати';
  if (advType === 2) {
    firstButtonContent = 'Активувати';
  } else if (advType === 3) {
    firstButtonContent = 'Відновити';
  } else if (advType === 4) {
    firstButtonContent = 'Видалити зі списку';
  }

  let secondButtonContent: string = 'Деактивувати';
  if (advType === 2) {
    secondButtonContent = 'Видалити';
  }

  convertDate(car.created);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id?: number,
  ) => {
    const targetButton = e.target as HTMLButtonElement;
    if (targetButton.textContent === 'Редагувати') {
      navigate('/advertisements/edit', { state: { id: car.id } });
    } else if (targetButton.textContent === 'Активувати') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'active' }),
      );
    } else if (targetButton.textContent === 'Деактивувати') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'inactive' }),
      );
    } else if (targetButton.textContent === 'Відновити') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'active' }),
      );
    } else if (targetButton.textContent === 'Видалити') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'deleted' }),
      );
    } else if (targetButton.textContent === 'Видалити зі списку') {
      if (onClickDelete) onClickDelete(id ?? 0);
    }
    
    if (targetButton.textContent !== 'Редагувати') {
      setTimeout(() => {
        dispatch(fetchMyAdsCount());
        switch (advType) {
          case 0:
            dispatch(fetchMyActiveAds());
            break;
          case 1:
            dispatch(fetchMyPendingAds());
            break;
          case 2:
            dispatch(fetchMyInactiveAds());
            break;
          case 3:
            dispatch(fetchMyDeletedAds());
            break;
          default:
            break;
        }
      }, 200);
    }
  };

  const onSrcImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = imagePlug;
  };

  const handleCardClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const tagName = (e.target as HTMLDivElement).tagName;
    if (tagName === 'BUTTON') {
      return;
    } else {
      navigate(`/catalog/${car.id}`);
    }
  };

  return (
    <li>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={styles.imgThumb}>
          <img
            src={car.fileUrl}
            alt={car.brand}
            className={styles.card_img}
            onError={onSrcImageError}
          />
        </div>

        <div className={styles.card_info}>
          <h3 className={styles.card_info_title}>
            {car.brand} {car.model} {car.year}
          </h3>
          <p className={styles.card_info_price}>{car.price} $</p>
          <div className={styles.card_info_meta}>
            <div className={styles.card_info_meta_first_line}>
              <div className={styles.card_info_views}>
                <img className={styles.icon} src={eye} alt="Eye icon" />
                <p className={styles.card_info_data}>{`${
                  car.viewCount
                } ${countViews(car.viewCount)}`}</p>
              </div>
              <div className={styles.card_info_phoneViews}>
                <img className={styles.icon} src={phone} alt="Phone icon" />
                <p className={styles.card_info_data}>{`${
                  car.openedPhoneCount || 0
                } ${countShows(car.openedPhoneCount)} телефону`}</p>
              </div>
            </div>
            <div className={styles.card_info_meta_second_line}>
              <div className={styles.card_info_likes}>
                <img
                  className={styles.icon}
                  src={favorite}
                  alt="Favorite icon"
                />
                <p className={styles.card_info_data}>
                  {car.addedFavoriteCount}
                </p>
              </div>
              <div className={styles.card_info_createdAt}>
                <img className={styles.icon} src={clock} alt="Clock icon" />
                <p className={styles.card_info_data}>
                  {convertDate(car.created)}
                </p>
              </div>
              {car.created !== car.lastUpdated && (
                <div className={styles.card_info_updatedAt}>
                  <img className={styles.icon} src={clock} alt="Clock icon" />
                  <p className={styles.card_info_data}>
                    {convertDate(car.lastUpdated)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className={styles.card_info_description}>{car.description}</p>

          <div className={styles.card_buttons}>
            <button
              className={styles.button}
              onClick={e => handleButtonClick(e, car.id)}
            >
              {firstButtonContent}
            </button>
            {(advType !== 3 && advType !== 4) && (
              <button className={styles.button} onClick={handleButtonClick}>
                {secondButtonContent}
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
