import React, {useEffect, useState}from 'react';
import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
import { CardSlider } from 'components/CardSlider';
import { PopularGoods } from 'components/PopularGoods';
import { CommonBtn } from 'components/Buttons/CommonBtn';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchNewCars, fetchPopularCars, fetchViewedCars } from 'redux/cars/operations';
import { getError, getNewCars, getPopularCars, getViewedCars } from 'redux/cars/selectors';
const NEWLIMIT=4;
const POPULARLIMIT=12;
export const HomePage: React.FC = () => {
  const [newCarsPage, setNewCarsPage]=useState(0);
  const [popularCarsPage, setPopularCarsPage]=useState(0);
  const [viewedCarsPage, setViewedCarsPage]=useState(0);
  const [isLastNewPage, setIsLastNewPage]=useState(false)
  const [isLastPopularPage, setIsLastPopularPage]=useState(false)
  const [isLastViewedPage, setIsLastViewedPage]=useState(false)
  const newCars=useAppSelector(getNewCars);
  const popularCars=useAppSelector(getPopularCars);
  const viewedCars=useAppSelector(getViewedCars);
  const getCarError=useAppSelector(getError);
  const dispatch=useAppDispatch()

  useEffect(()=>{
    if(!isLastViewedPage){
      dispatch(fetchViewedCars({page:viewedCarsPage, limit:NEWLIMIT}))
    }
  }, [dispatch, isLastViewedPage, viewedCarsPage])

  useEffect(()=>{
    if(!isLastNewPage){
      dispatch(fetchNewCars({page:newCarsPage, limit:NEWLIMIT}))
    }
  }, [dispatch, isLastNewPage, newCarsPage])

  useEffect(()=>{
    if(!isLastPopularPage){
      dispatch(fetchPopularCars({page:popularCarsPage, limit:POPULARLIMIT}))
    }
  }, [dispatch, isLastPopularPage, popularCarsPage])

  useEffect(()=>{
    if(viewedCars.length%NEWLIMIT!==0 || getCarError==='New transports not found.'){
      setIsLastViewedPage(true)
    }
  },[getCarError, viewedCars])

  useEffect(()=>{
    if(newCars.length%NEWLIMIT!==0 || getCarError==='New transports not found.'){
      setIsLastNewPage(true)
    }
  },[getCarError, newCars])

  useEffect(()=>{
    if(popularCars.length%POPULARLIMIT!==0 ){
      setIsLastPopularPage(true)
    }
  },[getCarError, popularCars])

const loadNextOnClick=(type:string | undefined)=>{
    switch (type){
      case 'popular':
        setPopularCarsPage((prevPage)=>prevPage+1)
        break;
      case 'Нещодавно переглянуті товари':
        setViewedCarsPage((prevPage)=>prevPage+1)
        break;
      case "Нові автомобілі на сайті":
        setNewCarsPage((prevPage)=>prevPage+1)
        break;
      default: return
    }
}
  return (
    <div className={styles.homePage}>
      <HomeTop />
      <div className={styles.main}>
        <div className={styles.recentGoods}>
          <CardSlider title={"Нещодавно переглянуті товари"} cars={viewedCars} /*заменить на пересмотренные машины*/ isLastPage={isLastViewedPage}  loadNextPage={loadNextOnClick}/>
        </div>
        <div className={styles.newGoods}>
          <CardSlider title={"Нові автомобілі на сайті"} cars={newCars} loadNextPage={loadNextOnClick} isLastPage={isLastNewPage}/>
        </div>
        <div className={styles.popularGoods}>
          <PopularGoods cars={popularCars} />
        </div>
        <div>
          <CommonBtn
            className={styles.loadBtn}
            onClick={() => loadNextOnClick('popular')}
          >
            Завантажити більше
          </CommonBtn>
        </div>
      </div>
    </div>
  );
};
