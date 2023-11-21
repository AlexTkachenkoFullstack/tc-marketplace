import React, { useState } from 'react';
import styles from './DropdownSlider.module.scss';
import arrowDown from '../../../../assets/icons/arrow-down.svg';
import close from '../../../../assets/icons/close.svg';

type Props = {
    nameType: string;
    
};

export default function DropdownSlider({ nameType }: Props) {
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
        
       
        <div className={`${styles.trigger_content} ${isActive ? styles.trigger_content_active : ''}`}
                >

                    
                        <div className={styles.text}>
                        {nameType}
                        </div>

                    <div className={styles.icons}
                        onClick={(e) => {
                            
                        }}
                    >
                        {!isActive ? (
                            <img
                                src={arrowDown}
                                alt="down"
                                className={styles.icon}
                            />
                        ) : (
                            <img
                                src={close}
                                alt="close"
                                className={styles.icon}

                            />
                        )}
                    </div>
                </div>
      </button>
      
      {isActive && <p>{nameType === 'Ціна' ? 'Ціна' : nameType === 'Пробіг' ? 'Пробіг' : 'Default Text'}</p>}
    </div>
  );
}
