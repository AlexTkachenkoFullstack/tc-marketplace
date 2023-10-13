import { FC } from 'react';
import styles from './Login.module.scss';
import line from '../../assets/images/horizontal-line.png';
import googleIcon from '../../assets/icons/google.svg';
import { NavLink } from 'react-router-dom';
import { Logo } from 'components/Logo';

export const LoginPage: FC = () => {
  return (
    <div className={styles.Container}>
      <nav className={styles.nav}>
        <NavLink to="/"><Logo className={styles.nav_logo} /></NavLink>
        <NavLink to="/" className={styles.nav_text}>Вихід</NavLink>
      </nav>

      <section className={styles.Login_container}>
        {/* <span className={styles.Login_step}>Крок 1/3</span> */}
        <h2 className={styles.Login_title}>Реєстрація</h2>
        <span className={styles.Login_login}>
          Вже є акаунт?<a href="/#" className={styles.Login_login_link}>Увійти</a>
        </span>
        <input type='email' placeholder='E-mail' className={styles.Login_email}></input>
        <button className={styles.Login_btn}>Увійти</button>
        <img src={line} alt='' className={styles.Login_line}/>
        <button className={styles.Login_googleBtn}>
          Увійти через Google
          <img src={googleIcon} alt='' className={styles.Login_googleBtn_icon}/>
        </button>
      </section>
    </div>
  );
};
