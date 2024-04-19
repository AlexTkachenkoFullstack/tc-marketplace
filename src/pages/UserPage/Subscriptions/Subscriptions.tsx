import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss';

import SubscriptionCard from './SubscriptionCard';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchSubscriptions } from 'redux/profile/operations';
import { getSubscriptions, isLoading } from 'redux/profile/selectors';
import { ISubscription } from 'types/ISubscription';

import { ReactComponent as AddIcon } from '../../../assets/icons/addSuscr.svg';
import Loader from 'components/Loader/Loader';
import SubscriptionModal from 'components/SubscriptionModal';
import { createPortal } from 'react-dom';
import { getCarTypeParam } from 'services/services';
import { fetchRegions, fetchTypes } from 'redux/filter/operations';

const portal = document.querySelector('#modal-root') as Element;

const initialRequestParams = {
  carBody: '' as string | string[],
  carColor: '' as string | string[],
  carDriveType: '' as string | string[],
  carFuel: '' as string | string[],
  carMark: 'Бренд' as string | string[],
  carModel: '' as string | string[],
  carNumberAxles: '' as string | string[],
  carTransmission: '' as string | string[],
  carTransportCondition: '' as string | string[],
  carWheelConfiguration: '' as string | string[],
  countryDeliver: 'Країна' as string | string[],
  engineDisplacement: { from: 0, to: 20 },
  enginePower: { from: 0, to: 1000 },
  mileage: { from: 0, to: 1000000 },
  numberOfDoors: { from: 2, to: 5 },
  numberOfSeats: { from: 2, to: 18 },
  price: { from: 100, to: 1000000 },
  selectedCategory: 'Легкові' as string | string[],
  selectedCity: 'Місто' as string | string[],
  selectedRegions: 'Регіон' as string | string[],
  year: { from: 1970, to: 2024 },
  selectedOption: false,
};

const Subscriptions: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParams, setSelectedParams] = useState(initialRequestParams);

  const dispatch = useAppDispatch();
  const isSubscrLoading = useAppSelector(isLoading);

  useEffect(() => {
    async function getCarTypeParams() {
      const data = await getCarTypeParam('1');
      setData(data);
    }
    getCarTypeParams();
  }, []);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(fetchTypes());
    dispatch(fetchRegions());
  }, [dispatch]);

  const mySubscriptions = useAppSelector(getSubscriptions);

  const toggleModalIsOpen = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleEditParams = ({
    id,
    name: subscrName,
    notificationStatus,
    parameterResponse,
  }: ISubscription) => {
    
    const {
      bodyType,
      transportType,
      color,
      driveType,
      fuelType,
      brand,
      model,
      numberAxles,
      transmission,
      condition,
      wheelConfiguration,
      producingCountry,
      engineDisplacementFrom,
      engineDisplacementTo,
      enginePowerFrom,
      enginePowerTo,
      mileageFrom,
      mileageTo,
      numberOfDoorsFrom,
      numberOfDoorsTo,
      numberOfSeatsFrom,
      numberOfSeatsTo,
      priceFrom,
      priceTo,
      city,
      region,
      yearsFrom,
      yearsTo,
      bargain,
    } = parameterResponse;

    const paramsForEdit = {
      carBody: bodyType || '',
      carColor: color || '',
      carDriveType: driveType || '',
      carFuel: fuelType || '',
      carMark: brand || 'Бренд',
      carModel: model || '',
      carNumberAxles: numberAxles || '',
      carTransmission: transmission || '',
      carTransportCondition: condition || '',
      carWheelConfiguration: wheelConfiguration || '',
      countryDeliver: producingCountry || 'Країна',
      engineDisplacement: {
        from: engineDisplacementFrom ?? 0,
        to: engineDisplacementTo ?? 20,
      },
      enginePower: { from: enginePowerFrom ?? 0, to: enginePowerTo ?? 1000 },
      mileage: { from: mileageFrom ?? 0, to: mileageTo ?? 1000000 },
      numberOfDoors: { from: numberOfDoorsFrom ?? 2, to: numberOfDoorsTo ?? 5 },
      numberOfSeats: {
        from: numberOfSeatsFrom ?? 2,
        to: numberOfSeatsTo ?? 18,
      },
      price: { from: priceFrom ?? 100, to: priceTo ?? 1000000 },
      selectedCategory: transportType || 'Легкові',
      selectedCity: city || 'Місто',
      selectedRegions: region || 'Регіон',
      year: { from: yearsFrom ?? 1970, to: yearsTo ?? 2024 },
      selectedOption: bargain || false,
      selectedName: subscrName || '',
      editSubscrId: id,
      notificationStatus,
    };

    setSelectedParams(paramsForEdit);
    toggleModalIsOpen();

    dispatch(fetchTypes());
    dispatch(fetchRegions());
  };

  return (
    <div className={styles.container}>
      {isSubscrLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className={styles.title}>Твої підписки</h3>
          <ul className={styles.subscriptionsList}>
            {mySubscriptions.map((item: ISubscription) => (
              <SubscriptionCard
                key={item.id}
                subscription={item}
                handleEditParams={handleEditParams}
              />
            ))}
          </ul>
          <button
            type="button"
            className={styles.addButton}
            onClick={toggleModalIsOpen}
          >
            <AddIcon />
            Створити підписку
          </button>
        </>
      )}
      {isModalOpen &&
        createPortal(
          <SubscriptionModal
            toggleModalIsOpen={toggleModalIsOpen}
            requestParams={{ ...selectedParams, data }}
          />,
          portal,
        )}
    </div>
  );
};

export default Subscriptions;
