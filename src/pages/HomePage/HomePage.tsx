import React from 'react';
import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
import { CardSlider } from 'components/CardSlider';
// import { GoToTopButton } from '../../components/GoToTopButton/GoToTopButton';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>

      <HomeTop />

      <div className={styles.main}>
        <div className={styles.recentGoods}>
          <CardSlider title={"Нещодавно переглянуті товари"} />
        </div>

        {/* <div className={styles.newGoods}>
          <CardSlider title={"Нові автомобілі на сайті"} />
        </div> */}

        <div className={styles.popularGoods}>
          {/* <PopularGoods /> */}
          {/* <h2 className={styles.new__title}>Популярні товари</h2>
          <div className={styles.card_container}>
            <article className={styles.card}>fgsdf</article>
            <article className={styles.card}>sfdf</article>
            <article className={styles.card}>sdfds</article>
          </div> */}
        </div>
      </div>
    </div>
  );
};
