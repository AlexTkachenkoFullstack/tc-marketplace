import React, { useEffect, useState } from 'react';
import styles from './messageModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { useAppSelector } from 'redux/hooks';
import { getMessage } from 'redux/profile/selectors';

const MessageModal = () => {
  const [isShow, setIsShow] = useState(false);
  const message = useAppSelector(getMessage);

  useEffect(() => {
    if (message) {
      setIsShow(true);
      const timer = setTimeout(() => {
        setIsShow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {isShow && (
        <div className={styles.backdrop}>
          <div className={styles.modalCard}>
            {message}
            <CloseIcon
              className={styles.closeIcon}
              onClick={() => setIsShow(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageModal;
