import React, { useState } from 'react';
import { useProfile } from 'hooks/useProfile';

import styles from './MyAds.module.scss';

import AdvContainer from './Card/AdvContainer';
import Loader from 'components/Loader/Loader';

enum Tab {
  active,
  pending,
  deactivated,
  deleted,
}

const MyAds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.active);

  const { adsCount } = useProfile();

  const activeCount = adsCount.find(({ status }) => status === 'ACTIVE')?.count;
  const pendingCount = adsCount.find(
    ({ status }) => status === 'PENDING',
  )?.count;
  const inactiveCount = adsCount.find(
    ({ status }) => status === 'INACTIVE',
  )?.count;
  const deletedCount = adsCount.find(
    ({ status }) => status === 'DELETED',
  )?.count;

  const {
    myActiveAds,
    myPendingAds,
    myInactiveAds,
    myDeletedAds,
    isAdsLoading,
  } = useProfile();

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.active:
        return <AdvContainer myAdverts={myActiveAds} advType={Tab.active} />;
      case Tab.pending:
        return <AdvContainer myAdverts={myPendingAds} advType={Tab.pending} />;
      case Tab.deactivated:
        return (
          <AdvContainer myAdverts={myInactiveAds} advType={Tab.deactivated} />
        );
      case Tab.deleted:
        return <AdvContainer myAdverts={myDeletedAds} advType={Tab.deleted} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {isAdsLoading && <Loader />}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === Tab.active ? styles.active : ''
          }`}
          onClick={() => setActiveTab(Tab.active)}
        >
          Активні{' '}
          {myActiveAds ? (
            <span
              className={styles.count}
              style={{ display: adsCount.length === 0 ? 'none' : '' }}
            >
              {activeCount}
            </span>
          ) : (
            ''
          )}
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === Tab.pending ? styles.active : ''
          }`}
          onClick={() => setActiveTab(Tab.pending)}
        >
          В очікуванні{' '}
          {myPendingAds ? (
            <span
              className={styles.count}
              style={{ display: adsCount.length === 0 ? 'none' : '' }}
            >
              {pendingCount}
            </span>
          ) : (
            ''
          )}
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === Tab.deactivated ? styles.active : ''
          }`}
          onClick={() => setActiveTab(Tab.deactivated)}
        >
          Деактивовані{' '}
          {myInactiveAds ? (
            <span
              className={styles.count}
              style={{ display: adsCount.length === 0 ? 'none' : '' }}
            >
              {inactiveCount}
            </span>
          ) : (
            ''
          )}
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === Tab.deleted ? styles.active : ''
          }`}
          onClick={() => setActiveTab(Tab.deleted)}
        >
          Видалені{' '}
          {myDeletedAds ? (
            <span
              className={styles.count}
              style={{ display: adsCount.length === 0 ? 'none' : '' }}
            >
              {deletedCount}
            </span>
          ) : (
            ''
          )}
        </button>
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default MyAds;
