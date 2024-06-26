import React, { useEffect, useState } from 'react';
// import GoToTop from 'components/GoToTop/GoToTop';
import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
import { CardSlider } from 'components/CardSlider';
import { PopularGoods } from 'components/PopularGoods';
import { CommonBtn } from 'components/Buttons/CommonBtn';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchFavoriteCars,
  fetchNewCars,
  fetchPopularCars,
  fetchViewedCars,
} from 'redux/cars/operations';
import {
  getNewCars,
  getPopularCars,
  getViewedCars,
} from 'redux/cars/selectors';
import { ICar } from 'types/IСar';
import { isAuthUser } from 'redux/auth/selectors';
import { ReactComponent as UpdBtn } from '../../assets/icons/update_btn.svg';
const POPULARLIMIT = 9;
export const HomePage: React.FC = () => {
  const newCars = useAppSelector(getNewCars);
  const popularCars = useAppSelector(getPopularCars);
  const viewedCars = useAppSelector(getViewedCars);
  const isAuth = useAppSelector(isAuthUser);
  const [popularCarsToShow, setPopularCarsToShow] = useState<ICar[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showButtonLoadMore, setShowButtonLoadMore] = useState<boolean>(true);
  const popularCarTotalPages = Math.ceil(popularCars.length / POPULARLIMIT);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentPage(0);
    dispatch(fetchViewedCars());
    dispatch(fetchNewCars());
    dispatch(fetchPopularCars());
    dispatch(fetchFavoriteCars());

  }, [dispatch]);

  useEffect(() => {
    setShowButtonLoadMore(false);
    if (popularCarTotalPages && currentPage === 0) {
      setPopularCarsToShow(popularCars.slice(0, POPULARLIMIT));
      setShowButtonLoadMore(true);
    }
    if (currentPage < popularCarTotalPages && currentPage > 0) {
      setPopularCarsToShow(prev => {
        const updatedPrevArrByIsFavoriteChanged = prev.map(prevCar => {
          const updatedCarIsFavoriteCnanged = popularCars.find(
            popularCar =>
              popularCar.id === prevCar.id &&
              popularCar.isFavorite !== prevCar.isFavorite,
          );
          return updatedCarIsFavoriteCnanged
            ? updatedCarIsFavoriteCnanged
            : prevCar;
        });
        const addedCarsByCurrentPage = popularCars
          .slice(currentPage * POPULARLIMIT, (currentPage + 1) * POPULARLIMIT)
          .filter(
            addedCar => !prev.some(prevCar => prevCar.id === addedCar.id),
          );
        return [
          ...updatedPrevArrByIsFavoriteChanged,
          ...addedCarsByCurrentPage,
        ];
      });
      setShowButtonLoadMore(true);
    }
    if (currentPage > 0 && currentPage === popularCarTotalPages - 1) {
      setShowButtonLoadMore(false);
    }
  }, [currentPage, popularCarTotalPages, popularCars]);

  const loadNextOnClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.homePage}>
      {/* <GoToTop /> */}
      <HomeTop />
      <div className={styles.main}>
        {isAuth && viewedCars.length > 0 && (
          <div className={styles.recentGoods}>
            <CardSlider
              title={'Нещодавно переглянуті товари'}
              cars={viewedCars} /*заменить на пересмотренные машины*/
            />
          </div>
        )}
        <div className={styles.newGoods}>
          <CardSlider title={'Нові автомобілі на сайті'} cars={newCars} />
        </div>
        <div className={styles.popularGoods}>
          <PopularGoods cars={popularCarsToShow}/>
        </div>
        <div>
          {showButtonLoadMore && (
            <CommonBtn
              className={styles.loadBtn}
              onClick={() => loadNextOnClick()}
            >
              Завантажити більше
              <UpdBtn className={styles.upd_btn}/>
            </CommonBtn>
          )}
        </div>
      </div>
    </div>
  );
};
