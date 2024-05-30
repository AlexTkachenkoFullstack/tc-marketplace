import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { useProfile } from 'hooks/useProfile';

// import styles from '../MyAds.module.scss';

import Card from './Card';

import { IAd } from 'types/IAd';

import {
  fetchMyActiveAds,
  fetchMyAdsCount,
  fetchMyDeletedAds,
  fetchMyInactiveAds,
  fetchMyPendingAds,
} from 'redux/profile/operations';
import EmprtyPlug from 'components/EmptyPlug/EmptyPlug';

interface IActiveCardProps {
  myAdverts: IAd[];
  advType: number;
}

const ActiveCard: React.FC<IActiveCardProps> = ({ myAdverts, advType }) => {
  const [isShowPlug, setIsShowPlug] = useState(false);

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
    setIsShowPlug(false);
    switch (advType) {
      case 0:
        dispatch(fetchMyActiveAds()).then(({ payload }: any) => {
          payload && payload.length === 0
            ? setIsShowPlug(true)
            : setIsShowPlug(false);
        });
        break;
      case 1:
        dispatch(fetchMyPendingAds()).then(({ payload }: any) => {
          payload && payload.length === 0
            ? setIsShowPlug(true)
            : setIsShowPlug(false);
        });
        break;
      case 2:
        dispatch(fetchMyInactiveAds()).then(({ payload }: any) => {
          payload && payload.length === 0
            ? setIsShowPlug(true)
            : setIsShowPlug(false);
        });
        break;
      case 3:
        dispatch(fetchMyDeletedAds()).then(({ payload }: any) => {
          payload && payload.length === 0
            ? setIsShowPlug(true)
            : setIsShowPlug(false);
        });
        break;

      default:
        break;
    }
  }, [dispatch, advType]);

  return (
    <>
      {myAdverts.length > 0 ? (
        myAdverts.map(car => (
          <Card
            key={car.id}
            car={car}
            advType={advType}
            isShowPlug={setIsShowPlug}
          />
        ))
      ) : (
        <>
          {!isAdsLoading && isShowPlug && (
            <EmprtyPlug
              title={`На даний момент відсутні ${typeText} оголошення`}
            />
          )}
        </>
      )}
    </>
  );
};

export default ActiveCard;
