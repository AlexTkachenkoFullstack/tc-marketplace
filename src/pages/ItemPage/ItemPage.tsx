import React, { useEffect, useState } from 'react';
import styles from './ItemPage.module.scss';
import { useParams } from 'react-router-dom';
import { getCarInfo, getUserContacts, getUserDetails } from 'services/services';
import { ITransport } from 'types/ITransport';
import { ItemGallery } from 'components/ItemGallery';
import millageIcon from 'assets/icons/millage.svg';
import transmissionIcon from 'assets/icons/transmission.svg';
import locationIcon from 'assets/icons/location.svg';
import updateIcon from 'assets/icons/replay.svg';
import paymentsIcon from 'assets/icons/payments.svg';
import colorIcon from 'assets/icons/color.svg';
import addedIcon from 'assets/icons/add_circle_outline.svg';
import viewIcon from 'assets/icons/eye-open.svg';
import { countViews } from "utils/countViews";
import { convertDateForCatalogItem } from "utils/convertDateForCatalogItem";
import { ProductDescription } from "./ProductDescription/ProductDescription";
import { SellerInfo } from "./SellerInfo/SellerInfo";
import { IUserDetails } from "types/IUserDetails";
import { IUserContacts } from "types/IUserContacts";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Characteristics } from "./Characteristics/Characteristics";
import { carDetail, getNewCars } from "redux/cars/selectors";
import { CardSlider } from "components/CardSlider";
import { fetchNewCars, getCarDetails } from "redux/cars/operations";
import Loader from "components/Loader/Loader";
import { ItemRightGalleryBigScreen } from "./ItemRightGalleryBigScreen";


export const ItemPage: React.FC = () => {
  const jsonString = localStorage.getItem('persist:userRoot');
  const dispatch = useAppDispatch();
   const [authToken, setAuthToken] = useState<string>('');
  const newCars = useAppSelector(getNewCars);
  const [carInfo, setCarInfo] = useState<null | ITransport>(null);
  const [userDetailsInfo, setUserDetailsInfo] = useState<null | IUserDetails>(
    null,
  );
  const [userContacts, setUserContacts] = useState<null | IUserContacts>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const carDetails=useAppSelector(carDetail)
  useEffect(() => {
    if (jsonString) {
      const data = JSON.parse(jsonString);
      const token = data.token.replace(/^"(.*)"$/, '$1');
      setAuthToken(token);
      
    }
  }, [jsonString]);

  console.log(authToken)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          setIsLoading(true);
          const carInfo = await getCarInfo(id);
          const userDetails = await getUserDetails(id);
          setCarInfo(carInfo);
          setUserDetailsInfo(userDetails);
          setIsLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error: any) {
        setError('Авто із таким id не знайдено');
        setCarInfo(null);
        setIsLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    const fetchUserContacts = async () => {
      try {
        if (id) {
          const userContacts = await getUserContacts(id);
          dispatch(getCarDetails(id));
          setUserContacts(userContacts);
        }
      } catch (er) {
        setError(er);
      }
    };
    fetchUserContacts();
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchNewCars());
  }, [dispatch]);


useEffect(()=>{
    dispatch(fetchNewCars())
}, [dispatch])


  return ( 
    <div className={styles.pageContainer}>
    <div className={styles.container}>
          {carInfo && carDetails && userDetailsInfo 
          ? <>
          <div className={styles.pathItem} id='top'>
              Головна сторінка/Каталог/ <span className={styles.brand}>{carInfo.brand} {carInfo.model}</span>
          </div>
          <div className={styles.galleryPhotosContainer}>
            <ItemGallery carInfo={carInfo} carDetails={carDetails}/>
            <div className={styles.galleryPhotosContainerRightSide}>
                {carInfo.galleries.map(item => item.transportGalleryUrl && <ItemRightGalleryBigScreen key={item.transportGalleryId} url={item.transportGalleryUrl}/>)}
            </div>
          </div>
          <div className={styles.itemInfoTop}>
            <div className={styles.itemInfoTopLeft}>

                <div className={styles.titleSection}>
                  <p className={styles.titleName}>
                    {carInfo.brand} {carInfo.model} {carInfo.year}
                  </p>
                  <p className={styles.titlePrice}>{carInfo.price} $</p>
                </div>
                    <div className={styles.mainCharacteristicsSection}>    
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={millageIcon} alt='millage'/>
                            <p className={styles.mainCharacteristicsText}> {carInfo.mileage} км пробігу</p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={paymentsIcon} alt='payments'/>
                            <p className={styles.mainCharacteristicsText}> {carInfo.bargain ? 'Можливий торг' : 'Без торгу'} </p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={addedIcon} alt='created date'/>
                            <p className={styles.mainCharacteristicsText}>Додано {convertDateForCatalogItem(carDetails.created)}</p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={transmissionIcon} alt='transmission'/>
                            <p className={styles.mainCharacteristicsText}> {carInfo.transmission}</p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={colorIcon} alt='color'/>
                            <p className={styles.mainCharacteristicsText}> {carInfo.color}</p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={updateIcon} alt='update date'/>
                            <p className={styles.mainCharacteristicsText}>Оновилось {convertDateForCatalogItem(carDetails.lastUpdated)}</p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={locationIcon} alt='location'/>
                            <p className={styles.mainCharacteristicsText}>місто {carInfo.city}</p>
                        </div>
                        <div className={styles.mainCharacteristicsItem}>
                            <img className={styles.mainCharacteristicsIcon} src={viewIcon} alt='views'/>
                            <p className={styles.mainCharacteristicsText}>{carDetails.countViews} {countViews(carDetails.countViews)}</p>
                        </div>
                    </div>
                    
                <ProductDescription description={carInfo.description}/>
            </div>
            <SellerInfo userInfo={userDetailsInfo} userContacts={userContacts}/>
          </div>
          <Characteristics carInfo={carInfo}/>
            
        </>
        : <div>{error}</div> 
    }
      </div> 
      <div className={styles.newGoods}>
            <CardSlider title={"Нові автомобілі на сайті"} cars={newCars} />
        </div>  
        {isLoading && <Loader/>}
      </div>   
  )
};
