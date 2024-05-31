import Loader from 'components/Loader/Loader';
import React, { useEffect, useMemo, useState } from 'react';
import {
  getHiddenTransportsData,
  getHiddenUsersData,
  putUnHideTransport,
  putUnHideUser,
} from 'services/services';
import StopListItem from './StopListItem/StopListItem';
import Card from '../MyAds/Card/Card';
import styles from './StopList.module.scss';
import { useNavigate } from 'react-router-dom';
import plug from '../../../assets/images/Property 1=07.svg';

const StopList: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [transportData, setTransportData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const categories = useMemo(() => ['Продавці', 'Транспорт'], []);

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
    fetchData();
    fetchTransportsData();
  }, []);
  useEffect(() => {
    if (userData.length > 0) {
      setActive(categories[0]);
      setSelectedCategory(categories[0]);
    } else if (transportData.length > 0) {
      setActive(categories[1]);
      setSelectedCategory(categories[1]);
    }
  }, [categories, transportData.length, userData.length]);

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

  const handleRedirect = (id: number) => {
    navigate(`/user-profile/${id}`);
  };
  const counterUser = userData && userData.length ? userData.length : 0;
  const counterCar =
    transportData && transportData.length ? transportData.length : 0;
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.title_container}>
        {userData.length > 0 && (
          <button
            className={`${styles.tab} ${
              categories[0] === active ? styles.active : ''
            }`}
            onClick={() => handleSelectCategory(categories[0])}
          >
            {categories[0]}
            {counterUser !== 0 && (
              <span className={styles.count}>{counterUser}</span>
            )}
          </button>
        )}
        {transportData.length > 0 && (
          <button
            className={`${styles.tab} ${
              categories[1] === active ? styles.active : ''
            }`}
            onClick={() => handleSelectCategory(categories[1])}
          >
            {categories[1]}

            {counterCar !== 0 && (
              <span className={styles.count}>{counterCar}</span>
            )}
          </button>
        )}
      </div>
      {userData.length > 0 && transportData.length > 0 ? (
        <>
          {' '}
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
                    onClickRedirect={() => handleRedirect(item.userId)}
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
                    offBlockInfo={true}
                    offBlockText={true}
                    updateStyle={['stop_list', 'stop_list_img']}
                  />
                ))}
            </ul>
          )}
        </>
      ) : (
        <div className={styles.img_container}>
          <img src={plug} alt="" className={styles.plug_img} />
          <p className={styles.text}>Скриті оголошення відображаються тут</p>
        </div>
      )}
    </>
  );
};

export default StopList;
