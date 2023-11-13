import React, { useState } from 'react';
import MyAds from './MyAds/MyAds';
import Subscriptions from './Subscriptions/Subscriptions';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import Security from './Security/Security';

import styles from './UserPage.module.scss';
import GoToTop from 'components/GoToTop/GoToTop';

enum Tab {
  MyAds,
  Subscriptions,
  PersonalInfo,
  Security,
}

export const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MyAds);

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.MyAds:
        return <MyAds />;
      case Tab.Subscriptions:
        return <Subscriptions />;
      case Tab.PersonalInfo:
        return <PersonalInfo />;
      case Tab.Security:
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.userPage}>
        <GoToTop />
        <div className={styles.container}>
          <h2 className={styles.userPage_title}>Ваш профіль</h2>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === Tab.MyAds ? styles.active : ''
              }`}
              onClick={() => setActiveTab(Tab.MyAds)}
            >
              Мої оголошення
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === Tab.Subscriptions ? styles.active : ''
              }`}
              onClick={() => setActiveTab(Tab.Subscriptions)}
            >
              Підписки
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === Tab.PersonalInfo ? styles.active : ''
              }`}
              onClick={() => setActiveTab(Tab.PersonalInfo)}
            >
              Персональна інформація
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === Tab.Security ? styles.active : ''
              }`}
              onClick={() => setActiveTab(Tab.Security)}
            >
              Безпека
            </button>
          </div>

          <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};
