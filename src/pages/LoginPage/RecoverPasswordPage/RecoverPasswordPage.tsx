import { FC, useState } from 'react';
import styles from './RecoverPassword.module.scss';
import axios from 'axios';
import { ShowToast } from 'components/Notification/ShowToast';

export const RecoverPasswordPage: FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [visibleCounter, setVisibleCounter] = useState(false);
  const [countdown, setCountdown] = useState(60);
  let timer: NodeJS.Timeout | undefined;

  const handleFieldChange = (value: string) => {
    setUserEmail(value);
  };

  const handleResend = () => {
    if (userEmail.length === 0) return;
    handleRecover();
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

  const redirectToMailService = () => {
    const parts = userEmail.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      let mailServiceURL = `https://mail.${domain}`;

      if (domain === 'gmail.com') {
        mailServiceURL = 'https://mail.google.com';
      }
      window.open(mailServiceURL, '_blank');
    };
  };

  const handleRecover = async () => {
    try {
      const URL = `https://backend-production-7a95.up.railway.app/api/v1/authorization/reset-password/send-code?email=${userEmail}`;
      await axios.put(URL);

      setSent(true);
    } catch (error: any) {
      setMessageError('Something went wrong');
    }

    setTimeout(() => setMessageError(''), 4500);
  }

  return (
    <div className={styles.Login_container}>
      <h2 className={styles.Login_title}>Відновлення паролю</h2>
      <span className={styles.Login_login}>
        Введіть пошту, щоб відновити пароль
      </span>

      <div>
        <input
          type='email'
          placeholder='E-mail'
          className={styles.Login_field}
          value={userEmail}
          onChange={(e) => handleFieldChange(e.target.value)}
          required
        />

      <div>
        <button onClick={!sent ? handleRecover : redirectToMailService} className={styles.Login_btn}>
          {!sent ? 'Відновити пароль' : 'Перевірити пошту'}
        </button>

        <>
          {messageError.length > 0 &&
            ShowToast({
              label: messageError,
              timer: 4500,
              backgroundColor: '#f1a9a9b7',
              color: '#ff3838',
              borderColor: '#ff3838',
            })}
        </>

        <button
          onClick={handleResend}
          className={visibleCounter? styles.Login__resend_disable : styles.Login__resend}
          disabled={visibleCounter}
        >
          Відправити знову {visibleCounter && `(${countdown}с)`}
        </button>
      </div>
      </div>
    </div>
  );
};
