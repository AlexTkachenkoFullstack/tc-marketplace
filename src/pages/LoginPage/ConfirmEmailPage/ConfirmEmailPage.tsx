import { FC, useState } from 'react';
import styles from './ConfirmEmailPage.module.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const ConfirmEmailPage: FC = () => {
  const [visibleCounter, setVisibleCounter] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let timer: NodeJS.Timeout | undefined;

  const paramValue = queryParams.get('email') as string;

  const handleResend = async () => {
    try {
      const URL = `http://138.68.113.54:8080/api/v1/authorization/register/resend-code?email=${paramValue}`;
      const response = await axios.put(URL)

      if (timer) {
        clearTimeout(timer);
      }

      setVisibleCounter(true);
      setCountdown(60);

    } catch (error) {
      console.error('Помилка відправки PUT-запиту:', error);
    }

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

  const redirectToMailService = () => {
    const parts = paramValue.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      let mailServiceURL = `https://mail.${domain}`;

      if (domain === 'gmail.com') {
        mailServiceURL = 'https://mail.google.com';
      }
      window.open(mailServiceURL, '_blank');
    };
  };

  return (
    <div className={styles.Login_container}>
      <h2 className={styles.Login_title}>Підтвердження пошти</h2>
      <span className={styles.Login_login}>
        Перевірте пошту, щоб підтвердити пароль
      </span>

      <div>
        <button className={styles.Login_btn} onClick={redirectToMailService}>
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
