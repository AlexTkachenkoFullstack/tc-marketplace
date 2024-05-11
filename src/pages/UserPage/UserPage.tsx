import React, { useEffect, useState } from 'react';

import styles from './UserPage.module.scss';

import GoToTop from 'components/GoToTop/GoToTop';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
// import MyAds from './MyAds';
// import Subscriptions from './Subscriptions';
// import PersonalInfo from './PersonalInfo';
// import Security from './Security';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { cleanFiltredStore, cleanParamsForSubscr } from 'redux/filter/slice';

enum Tab {
  MyAds,
  Subscriptions,
  StopList,
  PersonalInfo,
  Security,
}

export const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MyAds);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch =useAppDispatch()

   useEffect(() => {
     dispatch(cleanParamsForSubscr());
     dispatch(cleanFiltredStore({ field: 'all' }));
   }, [dispatch]);

  const categories = [
    'Мої оголошення',
    'Підписки',
    'Стоп-ліст',
    'Персональна інформація',
    'Безпека',
  ];



  let activeCategory: string;
  switch (activeTab) {
    case Tab.MyAds:
      activeCategory = categories[0];
      break;
    case Tab.Subscriptions:
      activeCategory = categories[1];
      break;
    case Tab.StopList:
      activeCategory = categories[2];
      break;
    case Tab.PersonalInfo:
      activeCategory = categories[3];
      break;
    case Tab.Security:
      activeCategory = categories[4];
      break;

    default:
      activeCategory = 'Мої оголошення';
      break;
  }

  // const renderTabContent = () => {
  //   switch (activeTab) {
  //     case Tab.MyAds:
  //       return <MyAds />;
  //     case Tab.Subscriptions:
  //       return <Subscriptions />;
  //     case Tab.StopList:
  //       return <Subscriptions />;
  //     case Tab.PersonalInfo:
  //       return <PersonalInfo />;
  //     case Tab.Security:
  //       return <Security />;
  //     default:
  //       return null;
  //   }
  // };

  const handleSelectCategory = (category: string) => {
    switch (category) {
      case categories[0]:
        setActiveTab(Tab.MyAds);
        navigate('my-adverts');
        break;
      case categories[1]:
        setActiveTab(Tab.Subscriptions);
        navigate('subscriptions');
        break;
      case categories[2]:
        setActiveTab(Tab.StopList);
        navigate('stop-list');
        break;
      case categories[3]:
        setActiveTab(Tab.PersonalInfo);
        navigate('user-info');
        break;
      case categories[4]:
        setActiveTab(Tab.Security);
        navigate('security');
        break;

      default:
        setActiveTab(Tab.MyAds);
        break;
    }
  };

  useEffect(() => {
    const activePage = location.pathname.split('/').pop();
    switch (activePage) {
      case 'my - adverts':
        setActiveTab(Tab.MyAds);
        break;
      case 'subscriptions':
        setActiveTab(Tab.Subscriptions);
        break;
      case 'stop-list':
        setActiveTab(Tab.StopList);
        break;
      case 'user-info':
        setActiveTab(Tab.PersonalInfo);
        break;
      case 'security':
        setActiveTab(Tab.Security);
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <div className={styles.userPage}>
        <GoToTop />
        <div className={styles.container}>
          <h2 className={styles.userPage_title}>Ваш профіль</h2>
          <CategoryBar
            categories={categories}
            handleSelect={handleSelectCategory}
            selectedCategory={activeCategory}
            selectedStyle="userPageStyle"
          />
          <Outlet />
          {/* {renderTabContent()} */}
        </div>
      </div>
    </>
  );
};
