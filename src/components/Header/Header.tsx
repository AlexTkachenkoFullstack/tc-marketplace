/* eslint-disable */
import { useState, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import styles from './Header.module.scss';
import menu from '../../assets/icons/menu.svg';
import plus from '../../assets/icons/add.svg';
import favorite from '../../assets/icons/favorite.svg';
import point from '../../assets/icons/point.svg';
import account from '../../assets/icons/account_circle.svg';
import { isAuthUser } from 'redux/auth/selectors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logoutThunk } from 'redux/auth/operations';

export const links = [
  {
    title: 'Link1',
    path: '/link1',
  },
  {
    title: 'Link2',
    path: '/link2',
  },
  {
    title: 'Link3',
    path: '/link3',
  },
    {
    title: 'Link4',
    path: '/link4',
  },
];

export const Header: FC = () => {
  const auth: boolean = useAppSelector(isAuthUser)
  const dispatchLogin = useAppDispatch();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [activeLink, setActiveLink] = useState('');

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const handleLogout = async () => {
    try {
      await dispatchLogin(logoutThunk())
        .then((resultAction) => {
          if (logoutThunk.fulfilled.match(resultAction)) {
            console.log('Loged out')
          } else if (logoutThunk.rejected.match(resultAction)) {
            console.log('Failed to log out');
          }
        });
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <button className={styles.header__burger}>
          <img src={menu} alt="Меню" />
        </button>
        <NavLink to="/"><Logo className={styles.header__logo} /></NavLink>

        <nav className={styles.header__nav}>
          <a className={styles.header__nav_link} href="#">Link</a>
          <a className={styles.header__nav_link} href="#">Link</a>
          <a className={styles.header__nav_link} href="#">Link</a>
          <a className={styles.header__nav_link} href="#">Link</a>
        </nav>

      </div>

      <div className={styles.header__right}>
        <button className={styles.header__add_button}>
          <span className={styles.header__add_button_text}>Додати оголошення</span>
          <img className={styles.header__add_button_icon} src={plus} alt="Додати" />
        </button>
        <button className={styles.header__favorite_button}>
          <img src={favorite} alt="Улюблене" />
          <img src={point} className={styles.header__favorite_button_point} />
        </button>

        {auth
        ? (
          <button
            className={styles.header__login_button}
            onClick={handleLogout}
          >
                <img className={styles.header__login_icon} src={account} alt="Акаунт" /> Вийти
          </button>
          )
        :  (
           <NavLink to="/login/log-in" className={styles.header__login_button}>
              <span className={styles.header__login_text}>Увійти</span>
          </NavLink>
          )
        }

      </div>
    </header>
  );
};
