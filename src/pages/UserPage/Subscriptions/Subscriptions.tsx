import React, { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss';

import SubscriptionCard from './SubscriptionCard';
import { getHiddenUsersData } from 'services/services';
import Loader from 'components/Loader/Loader';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';

const Subscriptions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Продавці');
  const [responseDataHiddenUsers, setResponseDataHiddenUsers] = useState();
  const [toggler, setToggler] = useState(false);

  console.log('responseData :>> ', responseDataHiddenUsers);
  const categories = ['Продавці', 'Транспорт'];

  useEffect(() => {
    async function hiddenUsersData() {
      try {
        setIsLoading(true);
        const response = await getHiddenUsersData();
        setResponseDataHiddenUsers(response);
        setIsLoading(false);
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
    hiddenUsersData();
  }, []);

  // const toggleOnClick = () => {
  //   setToggler(prev => !prev);
  // };


  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
    setToggler(prev => !prev);
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <h3 className={styles.title}>Твої підписки</h3>
      <div>
        <CategoryBar
          categories={categories}
          handleSelect={handleSelectCategory}
          selectedCategory={selectedCategory}
          selectedStyle="userPageStyle"
        />
        {/* <h4 onClick={toggleOnClick}>{!toggler ? 'Продавці' : 'Транспорт'}</h4> */}
        {!toggler ? <SubscriptionCard title={'Продавці'} /> : <SubscriptionCard title={'Транспорт'}/>}
      </div>
    </div>
  );
};

export default Subscriptions;
