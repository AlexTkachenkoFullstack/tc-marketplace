import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';

import styles from './Card.module.scss';

import { ReactComponent as Eye } from '../../../../../assets/icons/eye-open.svg';
import { ReactComponent as Phone } from '../../../../../assets/icons/phone.svg';
import { ReactComponent as Favorite } from '../../../../../assets/icons/favorite.svg';
import { ReactComponent as Calendar } from '../../../../../assets/icons/calendar_month.svg';
import { ReactComponent as Clock } from '../../../../../assets/icons/clock.svg';
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
import { convertUpdate } from 'utils/convertUpdate';

export interface CardProps {
  car: IAd;
  advType?: number;
  isDisabled?: boolean;
  onClickDelete?: (id: number) => void;
  isShowPlug?: React.Dispatch<React.SetStateAction<boolean>>;
  offBlockInfo?: boolean;
  offBlockText?: boolean;
  updateStyle?:string[];
}

const Card: React.FC<CardProps> = ({
  car,
  isDisabled,
  advType,
  onClickDelete,
  isShowPlug,
  offBlockInfo,
  offBlockText,
  updateStyle
}) => {
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

  const handleIsShowEmptyPlug = ({ payload }: any) => {
    payload && payload.length === 0
      ? isShowPlug && isShowPlug(true)
      : isShowPlug && isShowPlug(false);
  };

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
      ).then(() => dispatch(fetchMyInactiveAds()).then(handleIsShowEmptyPlug));
    } else if (targetButton.textContent === 'Деактивувати') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'inactive' }),
      ).then(() => dispatch(fetchMyActiveAds()).then(handleIsShowEmptyPlug));
    } else if (targetButton.textContent === 'Відновити') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'active' }),
      ).then(() => dispatch(fetchMyDeletedAds()).then(handleIsShowEmptyPlug));
    } else if (targetButton.textContent === 'Видалити') {
      dispatch(
        changeTransportStatus({ id: car.id, transportStatus: 'deleted' }),
      ).then(() => dispatch(fetchMyInactiveAds()).then(handleIsShowEmptyPlug));
    } else if (targetButton.textContent === 'Видалити зі списку') {
      if (onClickDelete) onClickDelete(id ?? 0);
    }

    if (targetButton.textContent !== 'Редагувати') {
      setTimeout(() => {
        dispatch(fetchMyAdsCount());
        switch (advType) {
          // case 0:
          //   dispatch(fetchMyActiveAds()).then(({ payload }: any) => {
          //     payload && payload.length === 0
          //       ? isShowPlug && isShowPlug(true)
          //       : isShowPlug && isShowPlug(false);
          //   });
          //   break;
          case 1:
            dispatch(fetchMyPendingAds()).then(({ payload }: any) => {
              payload && payload.length === 0
                ? isShowPlug && isShowPlug(true)
                : isShowPlug && isShowPlug(false);
            });
            break;
          case 2:
            // dispatch(fetchMyInactiveAds()).then(({ payload }: any) => {
            //   payload && payload.length === 0
            //     ? isShowPlug && isShowPlug(true)
            //     : isShowPlug && isShowPlug(false);
            // });
            break;
          case 3:
            // dispatch(fetchMyDeletedAds()).then(({ payload }: any) => {
            //   payload && payload.length === 0
            //     ? isShowPlug && isShowPlug(true)
            //     : isShowPlug && isShowPlug(false);
            // });
            break;
          default:
            break;
        }
      }, 300);
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
      <div className={`${styles.card } ${updateStyle && styles[updateStyle[0]]}`} onClick={handleCardClick}>
        <div className={`${
          updateStyle ? styles[updateStyle[1]]:
          styles.imgThumb}` }>
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
          <div
            className={styles.card_info_meta}
            style={{ display: offBlockInfo ? 'none' : '' }}
          >
            <div className={styles.card_info_meta_first_line}>
              {car.viewCount ? (
                <div className={styles.card_info_views}>
                  <Eye className={styles.icon} />
                  <p className={styles.card_info_data}>{`${
                    car.viewCount
                  } ${countViews(car.viewCount)}`}</p>
                </div>
              ) : null}
              {car.openedPhoneCount ? (
                <div className={styles.card_info_phoneViews}>
                  <Phone className={styles.icon} />
                  <p className={styles.card_info_data}>{`${
                    car.openedPhoneCount || 0
                  } ${countShows(car.openedPhoneCount)} телефону`}</p>
                </div>
              ) : null}
              <div className={styles.card_info_likes}>
                <Favorite className={styles.icon} />
                <p className={styles.card_info_data}>
                  {car.addedFavoriteCount}
                </p>
              </div>
            </div>
            <div className={styles.card_info_meta_second_line}>
              <div className={styles.card_info_createdAt}>
                <Calendar className={styles.icon} />
                <p className={styles.card_info_data}>
                  {convertDate(car.created)}
                </p>
              </div>
              {car.created !== car.lastUpdated && (
                <div className={styles.card_info_updatedAt}>
                  <Clock className={styles.icon} />
                  <p className={styles.card_info_data}>
                    {convertUpdate(car.lastUpdated)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className={styles.card_info_description} style={{display:offBlockText? 'none':''}}>{car.description}</p>

          <div className={styles.card_buttons}>
            <button
              className={styles.button}
              style={{ display: isDisabled ? 'none' : '' }}
              onClick={e => handleButtonClick(e, car.id)}
            >
              {firstButtonContent}
            </button>
            {advType !== 3 && advType !== 4 && (
              <button
                className={styles.button}
                style={{ display: isDisabled ? 'none' : '' }}
                onClick={handleButtonClick}
              >
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
