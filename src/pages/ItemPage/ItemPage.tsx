import React, { useEffect, useState } from "react";
import styles from './ItemPage.module.scss'
import { useParams } from "react-router-dom";
import { getCarDetails, getCarInfo } from "services/services";
import { ITransport } from "types/ITransport";
import { ItemGallery } from "components/ItemGallery";
import millageIcon from 'assets/icons/millage.svg';
import transmissionIcon from 'assets/icons/transmission.svg';
import locationIcon from 'assets/icons/location.svg';
import updateIcon from 'assets/icons/replay.svg';
import paymentsIcon from 'assets/icons/payments.svg';
import colorIcon from 'assets/icons/color.svg';
import addedIcon from 'assets/icons/add_circle_outline.svg';
import viewIcon from 'assets/icons/eye-open.svg';
import { ITransportDetails } from "types/ITransportDetails";
import { countViews } from "utils/countViews";
import { convertDateForCatalogItem } from "utils/convertDateForCatalogItem";
import { ProductDescription } from "./ProductDescription/ProductDescription";
import { SellerInfo } from "./SellerInfo/SellerInfo";

export const ItemPage: React.FC = () => {
  const [carInfo, setCarInfo] = useState<null | ITransport>(null)
  const [carDetails, setCarDetails] = useState<null | ITransportDetails>(null)
  const [error, setError] = useState<any>(null)
  const { id } = useParams();

  useEffect(() => {  
    const fetchCarDetails = async () => {
        try {
          if(id){
            const carInfo = await getCarInfo(id)
            const carDetails=await getCarDetails(id)
            setCarInfo(carInfo)
            setCarDetails(carDetails)
          }    
        } catch (error) {
            setError(error)
        }
    }
    fetchCarDetails()
}, [id])

  return (
    carInfo 
    && carDetails
    && <div className={styles.container}>
          <div className={styles.pathItem}>
              Головна сторінка/Каталог/ <span className={styles.brand}>{carInfo.brand} {carInfo.model}</span>
          </div>
          <ItemGallery carInfo={carInfo} carDetails={carDetails}/>
          <div className={styles.titleSection}>
              <p className={styles.titleName}>{carInfo.brand} {carInfo.model} {carInfo.year}</p>
              <p className={styles.titlePrice}>{carInfo.price} $</p>
          </div>
          <div className={styles.mainCharacteristicsSection}>
              <div className={styles.leftSide}>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={millageIcon} alt='millage'/>
                      <p className={styles.mainCharacteristicsText}> {carInfo.mileage} км пробігу</p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={transmissionIcon} alt='transmission'/>
                      <p className={styles.mainCharacteristicsText}> {carInfo.transmission}</p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={locationIcon} alt='location'/>
                      <p className={styles.mainCharacteristicsText}>місто {carInfo.city}</p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={updateIcon} alt='update date'/>
                      <p className={styles.mainCharacteristicsText}>Оновилось {convertDateForCatalogItem(carDetails.lastUpdated)}</p>
                  </div>
              </div>
              <div className={styles.rightSide}>
              <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={paymentsIcon} alt='payments'/>
                      <p className={styles.mainCharacteristicsText}> {carInfo.bargain ? 'Можливий торг' : 'Без торгу'} </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={colorIcon} alt='color'/>
                      <p className={styles.mainCharacteristicsText}> {carInfo.color}</p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={addedIcon} alt='created date'/>
                      <p className={styles.mainCharacteristicsText}>Додано {convertDateForCatalogItem(carDetails.created)}</p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                      <img className={styles.mainCharacteristicsIcon} src={viewIcon} alt='views'/>
                      <p className={styles.mainCharacteristicsText}>{carDetails.countViews} {countViews(carDetails.countViews)}</p>
                  </div>
              </div>
          </div>
          <ProductDescription description={carInfo.description}/>
          <SellerInfo/>
      </div>
  );
};
