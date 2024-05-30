import React, { useState } from 'react';
import styles from './ProductDescription.module.scss';
import { ReactComponent as MoreIcon } from './../../../assets/icons/arrowDownBig.svg';
import { ReactComponent as LessIcon } from './../../../assets/icons/arrowUpBig.svg';

interface IDescription {
  description: string;
}

export const ProductDescription: React.FC<IDescription> = ({ description }) => {
  const [showAllText, setShowAllText] = useState<boolean>(true);

  const toggleButton = () => {
    console.log('showAllText :>> ', showAllText);
    setShowAllText(prev => !prev);
  };

  return (
    <div className={styles.descriptionSection}>
      <p className={styles.descriptionTitle}>Опис</p>
      <div
        className={
          showAllText
            ? styles.descriptionContainerShort
            : styles.descriptionContainerAll
        }
      >
        <p className={styles.descriptionText}>{description} </p>
      </div>
      <div className={styles.descriptionButtonContainer}>
        <button className={styles.buttonShowHide} onClick={toggleButton}>
          <p className={styles.buttonShowHideText}>
            {showAllText ? 'Показати більше' : 'Сховати'}
          </p>
          {showAllText ? (
            <MoreIcon className={styles.hideShowIcon} />
          ) : (
            <LessIcon className={styles.hideShowIcon} />
          )}
        </button>
      </div>
    </div>
  );
};
