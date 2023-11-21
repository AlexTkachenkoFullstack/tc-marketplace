import React, { useState } from 'react';
import styles from './DropdownBtn.module.scss';

type Props = {
    nameType: string;
    
};

export default function DropdownBtn({ nameType}: Props) {
  const [isActive, setIsActive] = useState(false);

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
