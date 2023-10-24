import React, { FC, useState } from 'react';
import styles from './ConfirmEmailPage.module.scss';

export const ConfirmEmailPage: FC = () => {
  const [visibleCounter, setVisibleCounter] = useState(false);
  const [countdown, setCountdown] = useState(60);
  let timer: NodeJS.Timeout | undefined;

  const handleResend = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setVisibleCounter(true);
    setCountdown(60);

    timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        }

        clearInterval(timer);
        setVisibleCounter(false);
        return 0;
      });
    }, 1000);
  }

  return (
    <div className={styles.Login_container}>
      <h2 className={styles.Login_title}>Підтвердження пошти</h2>
      <span className={styles.Login_login}>
        Перевірте пошту, щоб підтвердити пароль
      </span>

      <div>
        <button className={styles.Login_btn}>
          Перейти
        </button>

        <button
          onClick={handleResend}
          className={visibleCounter? styles.Login__resend_disable : styles.Login__resend}
          disabled={visibleCounter}
        >
          Відправити знову {visibleCounter && `(${countdown}с)`}
        </button>
      </div>
    </div>
  );
};
