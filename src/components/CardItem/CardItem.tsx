import React from "react";
import styles from './CardItem.module.scss';
import { NavLink } from "react-router-dom";
import { LikeBtn } from "components/LikeBtn";

export const CardItem: React.FC = () => {
  return (
    <article className={styles.card}>
      <NavLink
        to="cardItem"
        className={styles.photo}
      >
        <img
          className={styles.img}
          src="http://surl.li/lmhoe"
          alt="Volkswagen Touareg 2021"
        />
      </NavLink>

      <div className={styles.col}>
        <h3 className={styles.title}>Volkswagen Touareg 2021</h3>

        <LikeBtn />
      </div>


      <p className={styles.price}>71 500 $</p>

      <ul className={styles.techSpecs}>
        <li className={styles.techSpec}>120 тис. км</li>
        <li className={styles.techSpec}>Харків</li>
        <li className={styles.techSpec}>Автомат</li>
        <li className={styles.techSpec}>бензин</li>
        <li className={styles.techSpec}>2021 рік</li>
      </ul>
    </article>
  )
};
