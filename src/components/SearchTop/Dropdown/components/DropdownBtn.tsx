import React, { useState } from 'react';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import styles from './DropdownBtn.module.scss';
import arrowDown from '../../../../assets/icons/arrow-down.svg';
import close from '../../../../assets/icons/close.svg';

import AdvSearchBottom from '../../../../pages/AdvancedSearchPage/AdvSearchBottom/AdvSearchBottom'
import {
  DropdownInfoOption,
  DropdownNoMatchOption,
  DropdownOption,
  DropdownSelectAllOption,
} from './DropdownOptions';

type Props = {
    nameType: string;
    
};

export default function DropdownBtn({ nameType}: Props) {
  const [isActive, setIsActive] = useState(false);

  const closeDropdown = () => {
    setIsActive(false);
    
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.trigger} ${isActive ? styles.trigger_active : ''}`}
        type="button"
        onClick={() => {
          setIsActive((prevState: boolean) => !prevState);
        }}
      >
        
        <div className={`${styles.trigger_content} ${isActive ? styles.trigger_content_active : ''}`}>
            <div className={styles.text}>
              {nameType}
            </div>
        </div>
      </button>

     
    </div>
  );
}
