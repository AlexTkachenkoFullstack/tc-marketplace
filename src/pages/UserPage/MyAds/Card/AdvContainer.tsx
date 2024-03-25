import React, { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { useProfile } from 'hooks/useProfile';

import styles from '../MyAds.module.scss';

import Card from './Card';

import { IAd } from 'types/IAd';

import {
  fetchMyActiveAds,
  fetchMyAdsCount,
  fetchMyDeletedAds,
  fetchMyInactiveAds,
  fetchMyPendingAds,
} from 'redux/profile/operations';

interface IActiveCardProps {
  myAdverts: IAd[];
  advType: number;
}

const ActiveCard: React.FC<IActiveCardProps> = ({ myAdverts, advType }) => {
  const dispatch = useAppDispatch();
  const { isAdsLoading } = useProfile();
  let typeText: string;
  switch (advType) {
    case 0:
      typeText = 'активні';
      break;
    case 1:
      typeText = 'очікувані';
      break;
    case 2:
      typeText = 'деактивовані';
      break;
    case 3:
      typeText = 'видалені';
      break;

    default:
      typeText = '';
      break;
  }

  useEffect(() => {
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
  }, [dispatch, advType]);

  return (
    <>
      {myAdverts.length > 0 ? (
        myAdverts.map(car => <Card key={car.id} car={car} advType={advType} />)
      ) : (
        <p className={styles.empty}>
          {!isAdsLoading && `На даний момент відсутні ${typeText} оголошення`}
        </p>
      )}
    </>
  );
};

export default ActiveCard;
