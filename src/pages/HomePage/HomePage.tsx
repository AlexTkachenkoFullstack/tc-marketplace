import React, { useEffect, useState } from 'react';
import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
import { CardSlider } from 'components/CardSlider';
import { PopularGoods } from 'components/PopularGoods';
import { CommonBtn } from 'components/Buttons/CommonBtn';
import { getProductCategories } from 'api/search';
// import { useAppDispatch, useAppSelector } from 'redux/hooks';
// import { selectSuggestedProducts } from 'redux/selectors';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState('');
  const [regions, setRegions] = useState('');
  const [brands, setBrands] = useState('');
  const [models, setModels] = useState('');

  return (
    <div className={styles.homePage}>
      <HomeTop
      />

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
