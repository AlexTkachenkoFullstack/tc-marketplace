import React, { useEffect, useState } from 'react';
import styles from './messageModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getMessage } from 'redux/profile/selectors';
import { cleanMessage } from 'redux/profile/slice';

const MessageModal = () => {
  const [isShow, setIsShow] = useState(false);
  const message = useAppSelector(getMessage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      setIsShow(true);
      const timer = setTimeout(() => {
        setIsShow(false);
        dispatch(cleanMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, message]);

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
