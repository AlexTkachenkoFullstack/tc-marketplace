import React, {useState} from 'react';
import styles from './MyAds.module.scss';

import ActiveCard,{qntActive} from './Card/ActiveCard';
import PendingCard,{qntPending} from './Card/PendingCard';
import DeactivatedCard,{qntDeactivated} from './Card/DeactivatedCard';
import DeletedCard,{qntDeleted} from './Card/DeletedCard';

enum Tab {
  active,
  pending,
  deactivated,
  deleted,
}

const MyAds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.active);

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.active:
        return <ActiveCard/>;
      case Tab.pending:
        return <PendingCard/>;
      case Tab.deactivated:
        return <DeactivatedCard/>;
      case Tab.deleted:
        return <DeletedCard/>;
      default:
        return null;
    }
  }
  return (
    <div className={styles.MyAds}>
      <div className={styles.container}>
        <div className={styles.MyAds_statusTabs}>
        <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === Tab.active ? styles.active : ''}`} onClick={() => setActiveTab(Tab.active)}>Активні {qntActive ? <span className={styles.count}>{qntActive}</span> : ''}</button>
            <button className={`${styles.tab} ${activeTab === Tab.pending ? styles.active : ''}`} onClick={() => setActiveTab(Tab.pending)}>В очікуванні {qntPending ? <span className={styles.count}>{ qntPending }</span> : ''}</button>
            <button className={`${styles.tab} ${activeTab === Tab.deactivated ? styles.active : ''}`} onClick={() => setActiveTab(Tab.deactivated)}>Деактивовані {qntDeactivated ? <span className={styles.count}>{qntDeactivated}</span> : ''}</button>
            <button className={`${styles.tab} ${activeTab === Tab.deleted ? styles.active : ''}`} onClick={() => setActiveTab(Tab.deleted)}>Видалені {qntDeleted ? <span className={styles.count}>{qntDeleted}</span> : ''}</button>
        </div>
        <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
        
      </div>
    </div>
  );
};

export default MyAds;