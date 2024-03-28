import React from 'react';
import styles from './Subscriptions.module.scss';

import SubscriptionCard from './SubscriptionCard';

const Subscriptions: React.FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Твої підписки</h3>
      <ul>
        <SubscriptionCard/>
      </ul>
    </div>
  );
};

export default Subscriptions;
