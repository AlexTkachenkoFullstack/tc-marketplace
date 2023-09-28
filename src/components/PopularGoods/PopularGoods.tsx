import React from "react";
import styles from './PopularGoods.module.scss';
import '../../styles/blocks/_container.scss';
import { NavLink } from "react-router-dom";
import { CardItem } from "components/CardItem";

export const PopularGoods: React.FC = () => {
  return (
    <section className={styles.goods}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні товари</h2>

            <NavLink to="goods" className={styles.moreBtn}>
              Переглянути більше
            </NavLink>
          </div>

          <div className={styles.catalog}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div className={styles.card} key={index}>
                <CardItem />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
};
