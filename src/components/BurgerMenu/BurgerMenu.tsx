/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from '../Logo/Logo';
import { links } from '../../modules/Header';
import styles from './BurgerMenu.module.scss';

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isOpen, toggleMenu }) => {
  const [activeLink, setActiveLink] = useState<string>('');

  const handleLinkClick = (linkIndex: string) => {
    setActiveLink(linkIndex);
    toggleMenu();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.overflow__hidden);
    } else {
      document.body.classList.remove(styles.overflow__hidden);
    }
  }, [isOpen]);

  return (
    <aside className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.burgerMenu__header}>
        <Logo />

        <div className={styles.burgerMenu__header__bottons}>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {links.map((link) => (
            <li key={link.title} className={styles.nav__item}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  cn(styles.nav__link, {
                    [styles.is_activeLink]: isActive,
                  })
                }
                onClick={() => handleLinkClick(link.path)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.menuButtons}>
      </div>
    </aside>
  );
};
