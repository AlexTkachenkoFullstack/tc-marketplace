import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from 'classnames';

import styles from './CardItem.module.scss';

import LikeImg from '../../assets/icons/favorite.svg';
import ActiveLikeImg from '../../assets/icons/favorite-active.svg';
import { CommonBtn } from "components/Buttons/CommonBtn";
import { ICar } from "types/IСar";

interface Props {
  car?:ICar;
}

export const CardItem: React.FC<Props> = ({ car }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className={styles.card}>
      <NavLink
        to="cardItem ?????"
        className={styles.photo}
      >
        <img
          className={styles.img}
          src={car?.imgUrl}
          alt={car?.transportBrand}
        />
      </NavLink>

      <div className={styles.col}>
        <NavLink to="/Volkswagen_Touareg_2021 ?????" className={styles.link}>
          <h3 className={styles.title}>{car?.transportBrand} {car?.transportModel} {car?.year}</h3>
        </NavLink>

        <div>
          <CommonBtn
            iconPath={isLiked ? ActiveLikeImg : LikeImg }
            className={cn(styles.likeBtn)}
            onClick={() => setIsLiked(!isLiked)}
          />
        </div>
      </div>


      <p className={styles.price}>{car?.price} $</p>

      <ul className={styles.techSpecs}>
        <li className={styles.techSpec}>{car && car.mileage !== undefined ? `${Math.floor(car.mileage / 1000)} тис. км` : "Нема данних"}</li>
        <li className={styles.techSpec}>{car?.city}</li>
        <li className={styles.techSpec}>{car?.transmission}</li>
        <li className={styles.techSpec}>{car?.fuelType}</li>
        <li className={styles.techSpec}>{car?.year} рік</li>
      </ul>
    </article>
  )
};
