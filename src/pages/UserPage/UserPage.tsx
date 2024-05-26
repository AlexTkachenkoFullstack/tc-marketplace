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
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow_left.svg';

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
  const dispatch = useAppDispatch();

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

  const handleBackClick = () => {
    navigate('/')
    // if (window.history.length > 1) {
    //   // Если история браузера содержит более одной страницы, возвращаемся на предыдущую страницу
    //   navigate(-1);
    // } else {
    //   // В противном случае перенаправляем на главную страницу
    //   navigate('/');
    // }
  };
  return (
    <>
      {/* <div className={styles.userPage}> */}
      <GoToTop />
      {/* <div className={styles.container}> */}
      <section className={styles.headSection}>
        <div className={styles.container}>
          <div className={styles.titleThumb}>
            <button type="button" onClick={handleBackClick}>
              <ArrowLeftIcon />
            </button>
            <h2 className={styles.title}>Ваш профіль</h2>
          </div>
        </div>
      </section>
      <section className={styles.categorySection}>
        <CategoryBar
          categories={categories}
          handleSelect={handleSelectCategory}
          selectedCategory={activeCategory}
          selectedStyle="userPageStyle"
        />
      </section>
      <Outlet />
      {/* {renderTabContent()} */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
