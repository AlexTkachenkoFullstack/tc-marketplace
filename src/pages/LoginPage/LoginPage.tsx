import { FC } from 'react';
import styles from './Login.module.scss';

export const LoginPage: FC = () => {
  return (
    <div className={styles.Container}>
      <section className={styles.Login_container}>
        <span className={styles.Login_step}>Крок 1/3</span>
        <h2 className={styles.Login_title}>Реєстрація</h2>
        <span className={styles.Login_login}>
          Вже є акаунт?<a href="/#">Увійти</a>
        </span>
        <input type='email' placeholder='E-mail' className={styles.Login_email}></input>
        <button className={styles.Login_btn}>Увійти</button>
        <img src='../../assets/images/horizontal-line.png' alt=''/>
        <button className={styles.Login_googleBtn}>Увійти через Google</button>
      </section>
    </div>
  );
};
