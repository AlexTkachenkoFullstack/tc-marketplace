import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import {
  getHiddenTransportsData,
  getHiddenUsersData,
  putUnHideTransport,
  putUnHideUser,
} from 'services/services';
import StopListItem from './StopListItem/StopListItem';
import Card from '../MyAds/Card/Card';
import styles from './StopList.module.scss';

const StopList: React.FC = () => {
  const [active, setActive] = useState<string>('Продавці');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [transportData, setTransportData] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<string>('Продавці');
  const categories = ['Продавці', 'Транспорт'];
  console.log('userData :>> ', userData);
  console.log('transportData :>> ', transportData);
  const el =
    transportData &&
    transportData.map((item: any) => console.log('item :>> ', item.transport));
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getHiddenUsersData();
      setUserData(response);
      setIsLoading(false);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const fetchTransportsData = async () => {
    setIsLoading(true);
    try {
      const response = await getHiddenTransportsData();
      setTransportData(response);
      setIsLoading(false);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    if (selectedCategory === 'Продавці') {
      fetchData();
    }
    if (selectedCategory === 'Транспорт') {
      fetchTransportsData();
    }
  }, [selectedCategory]);

  const handleSelectCategory = (category: string) => {
    setActive(category);
    setSelectedCategory(category);
  };

  const handleUnHideUser = async (id: number) => {
    setIsLoading(true);
    const response = await putUnHideUser(id);
    if (response) {
      const newUserData = userData.filter((item: any) => item.userId !== id);
      setUserData(newUserData);
      setIsLoading(false);
    }
  };
  const handleUnHideTransport = async (id: number) => {
    setIsLoading(true);
    const response = await putUnHideTransport(id);
    if (response) {
      const newTransportData = transportData.filter(
        (item: any) => item.transport.id !== id,
      );
      setTransportData(newTransportData);
      setIsLoading(false);
    }
  };
  const handleRedirect = (id: number) => {};
  const counterUser = userData && userData.length ? userData.length: 0;
  const counterCar = transportData && transportData.length ? transportData.length:0;
  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <div className={styles.title_container}>
        <button
          className={`${styles.tab} ${
            categories[0] === active ? styles.active : ''
          }`}
          onClick={() => handleSelectCategory(categories[0])}
        >
          {categories[0]}
          {counterUser !== 0 && <span className={styles.count}>{counterUser}</span>}
        </button>
        <button
          className={`${styles.tab} ${
            categories[1] === active ? styles.active : ''
          }`}
          onClick={() => handleSelectCategory(categories[1])}
        >
          {categories[1]}

          {counterCar !== 0 && <span className={styles.count}>{counterCar}</span>}
        </button>
      </div>
      {selectedCategory === 'Продавці' && (
        <ul>
          {userData &&
            userData.map((item: any) => (
              <StopListItem
                id={item.userId}
                key={item.id}
                title={item.userName}
                userPhoto={item.userPhoto}
                onClickDelete={handleUnHideUser}
                onClickRedirect={handleRedirect}
              />
            ))}
        </ul>
      )}
      {selectedCategory === 'Транспорт' && (
        <ul className={styles.item}>
          {transportData &&
            transportData.map((car: any) => (
              <Card
                key={car.id}
                car={car.transport}
                advType={4}
                onClickDelete={handleUnHideTransport}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default StopList;
