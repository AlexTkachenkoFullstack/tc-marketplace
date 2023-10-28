import { FC, useState } from 'react';
import styles from './RecoverPassword.module.scss';
// import axios from 'axios';

export const RecoverPasswordPage: FC = () => {
  const [email, setEmail] = useState('');
  const [visibleCounter, setVisibleCounter] = useState(false);
  const [countdown, setCountdown] = useState(60);
  let timer: NodeJS.Timeout | undefined;

  const handleFieldChange = (value: string) => {
    setEmail(value);
  };

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

  const handleRecover = () => {
    // axios.post()
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
          value={email}
          onChange={(e) => handleFieldChange(e.target.value)}
          required
        />

      <div>
        <button onClick={handleRecover} className={styles.Login_btn}>
          Відновити пароль
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
    </div>
  );
};
