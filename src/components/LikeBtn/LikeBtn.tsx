import React, { useState } from 'react';
import styles from './LikeBtn.module.scss';
import {ReactComponent as FavouriteImg} from '../../assets/icons/favorite.svg';
import {ReactComponent as ActiveFavouriteImg} from '../../assets/icons/favorite-active.svg';

export const LikeBtn: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={styles.btn}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? <ActiveFavouriteImg /> : <FavouriteImg />}
    </button>
  )
};
