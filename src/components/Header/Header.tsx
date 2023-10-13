/* eslint-disable */
import { useState, FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from '../Logo';
import styles from './Header.module.scss';
import menu from '../../assets/icons/menu.svg';
import plus from '../../assets/icons/add.svg';
import favorite from '../../assets/icons/favorite.svg';
import point from '../../assets/icons/point.svg';
import account from '../../assets/icons/account_circle.svg';

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
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [activeLink, setActiveLink] = useState('');

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

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
        <NavLink to="/login" className={styles.header__login_button}>
          <img className={styles.header__login_icon} src={account} alt="Акаунт" />
          <span className={styles.header__login_text}>Увійти</span>
        </NavLink>
      </div>
    </header>
  );
};
