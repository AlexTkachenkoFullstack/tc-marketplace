import React from 'react';
import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
import { CardSlider } from 'components/CardSlider';
import { PopularGoods } from 'components/PopularGoods';
import { CommonBtn } from 'components/Buttons/CommonBtn';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <HomeTop />

      <div className={styles.main}>
        <div className={styles.recentGoods}>
          <CardSlider title={"Нещодавно переглянуті товари"} />
        </div>

        <div className={styles.newGoods}>
          <CardSlider title={"Нові автомобілі на сайті"} />
        </div>

        <div className={styles.popularGoods}>
          <PopularGoods />
        </div>

        <div>
          <CommonBtn
            className={styles.loadBtn}
          >
            Завантажити більше
          </CommonBtn>
        </div>
      </div>
    </div>
  );
};
