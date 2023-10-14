import React, {useEffect}from 'react';
import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
import { CardSlider } from 'components/CardSlider';
import { PopularGoods } from 'components/PopularGoods';
import { CommonBtn } from 'components/Buttons/CommonBtn';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchNewCars } from 'redux/cars/operations';
import { getNewCars } from 'redux/cars/selectors';


export const HomePage: React.FC = () => {
  const newCars=useAppSelector(getNewCars);
  const dispatch=useAppDispatch()
  
  useEffect(()=>{
  dispatch(fetchNewCars({page:1, limit:3}))
  }, [dispatch])

  return (
    <div className={styles.homePage}>
      <HomeTop />

      <div className={styles.main}>
        <div className={styles.recentGoods}>
          <CardSlider title={"Нещодавно переглянуті товари"} />
        </div>

        <div className={styles.newGoods}>
          <CardSlider title={"Нові автомобілі на сайті"} newCars={newCars}/>
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
