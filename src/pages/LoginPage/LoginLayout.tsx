import { useEffect, FC } from 'react';
import styles from './LoginLayout.module.scss';

import { NavLink, Outlet } from 'react-router-dom';
import { Logo } from 'components/Logo';

// import { useAppDispatch } from 'redux/hooks';
// import { fetchGoogleUser } from 'helpers/fetchGoogleUser';
// import { Dispatch } from 'redux';
// import googleIcon from '../../assets/icons/google.svg';


export const LoginLayout: FC = () => {
  // const dispatch:Dispatch=useAppDispatch()
  //   useEffect(()=>{
  //     fetchGoogleUser(dispatch)
  // }, [dispatch])

  return (
    
      <section className={styles.authSection}>
        <div className={styles.Container}>
          <nav className={styles.nav}>
            <NavLink to="/">
              <Logo className={styles.nav_logo} />
            </NavLink>
            <NavLink to="/" className={styles.nav_text}>
              Вихід
            </NavLink>
          </nav>

          <Outlet />
          {/* <button className={styles.Login_googleBtn} id="google_button">
          Зареєструватися через Google
          <img
            src={googleIcon}
            alt="Google Icon"
            className={styles.Login_googleBtn_icon}
          />
        </button> */}
        </div>
      </section>

  );
};
