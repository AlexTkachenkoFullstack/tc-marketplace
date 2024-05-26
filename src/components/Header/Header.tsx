/* eslint-disable */
import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';
import styles from './Header.module.scss';
// import menu from '../../assets/icons/menu.svg';
import point from '../../assets/icons/point.svg';
import { isAuthUser } from 'redux/auth/selectors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logoutThunk } from 'redux/auth/operations';
import { ReactComponent as Plus } from '../../assets/icons/add.svg';
import { ReactComponent as Add } from '../../assets/icons/addCircle.svg';
import { ReactComponent as Account } from '../../assets/icons/account_circle.svg';
import { ReactComponent as Favorite } from '../../assets/icons/favorite.svg';
import { ReactComponent as FavoriteActive } from '../../assets/icons/heart-active.svg';
import { getFavoriteCars } from 'redux/cars/selectors';
// import { fetchNewCars, fetchPopularCars } from 'redux/cars/operations';heart-active.svg

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
  const auth: boolean = useAppSelector(isAuthUser);
  const dispatchLogout = useAppDispatch();
  const navigate = useNavigate();
  const isAdvertisementsEdit = location.pathname === '/advertisements/edit';
  const isAdvertisements = location.pathname === '/advertisements';
  const favoriteCars = useAppSelector(getFavoriteCars);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = screenWidth < 768;

  const handleFavoritesClick = () => {
    navigate('/favorites');
    // setIsActive(!isActive);
  };
  const handleNewAnnouncementClick = () => {
    navigate('/advertisements');
  };
  const handleLogout = async () => {
    dispatchLogout(logoutThunk());
    navigate('/');
  };

  return (
    <header
      className={styles.header}
      // style={{backgroundColor:isFavoritesPage || isAdvencedSearch ? '#E4E4E4':''}}
    >
      <div className={styles.header__left}>
        {/* <button className={styles.header__burger}>
          <img src={menu} alt="Меню" />
        </button> */}
        <Logo className={styles.header__logo} />
      </div>

      <div className={styles.header__right}>
        <button
          className={styles.header__add_button}
          style={{
            display: isAdvertisementsEdit || isAdvertisements ? 'none' : '',
          }}
          onClick={handleNewAnnouncementClick}
          disabled={isAdvertisements}
        >
          {auth ? (
            isMobile ? (
              <Add className={styles.add_icon} />
            ) : (
              <>
                Додати оголошення
                <Plus className={styles.header__add_button_icon} />
              </>
            )
          ) : (
            ''
          )}
        </button>
        {favoriteCars.length > 0 && auth && (
          <button
            className={`${styles.header__favorite_button}`}
            onClick={handleFavoritesClick}
          >
            <Favorite className={`${styles.svg_icon}  `} />
          </button>
        )}
        {auth ? (
          <div className={styles.header__auth_container}>
            <NavLink
              to="/user/my-adverts"
              className={`${styles.header__favorite_button}`}
            >
              <Account className={`${styles.header__login_icon}`} />
            </NavLink>
            <button
              className={styles.header__login_button}
              onClick={handleLogout}
            >
              <span className={styles.header__login_text}>Вийти</span>
            </button>
          </div>
        ) : (
          <NavLink to="/login/log-in" className={styles.header__login_button}>
            <span className={styles.header__login_text}>Увійти</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};
