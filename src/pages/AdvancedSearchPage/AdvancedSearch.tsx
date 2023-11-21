import React,{useState} from 'react';
import styles from './AdvancedSearch.module.scss';
import {SearchTop} from '../../components/SearchTop/SearchTop';
import AdvSearchBottom from './AdvSearchBottom/AdvSearchBottom';

export const AdvancedSearch: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.AdvSearch}>
      <div className={styles.AdvSearch_container}>
        <div className={styles.AdvSearch_box}>
          <h1 className={styles.AdvSearch_title}>Розширений пошук</h1>
          <SearchTop setIsActive={setIsActive} />
        </div>
      </div>
      {isActive && <AdvSearchBottom isActive={isActive}/>}
    </div>
  );
};

