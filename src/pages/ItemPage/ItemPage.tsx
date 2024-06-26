import React, { useEffect, useState } from 'react';
import styles from './ItemPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCarInfo,
  // getHiddenTransportsData,
  // getHiddenUsersData,
  getUserContacts,
  getUserDetails,
} from 'services/services';
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
import { countViews } from 'utils/countViews';
import { convertDateForCatalogItem } from 'utils/convertDateForCatalogItem';
import { ProductDescription } from './ProductDescription/ProductDescription';
import { SellerInfo } from './SellerInfo/SellerInfo';
import { IUserDetails } from 'types/IUserDetails';
import { IUserContacts } from 'types/IUserContacts';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Characteristics } from './Characteristics/Characteristics';
import { carDetail, getNewCars } from 'redux/cars/selectors';
import { CardSlider } from 'components/CardSlider';
import {
  addToFavourites,
  fetchNewCars,
  getCarDetails,
  removeFromFavourites,
} from 'redux/cars/operations';
import Loader from 'components/Loader/Loader';
import { ItemRightGalleryBigScreen } from './ItemRightGalleryBigScreen';
import { ReactComponent as Back } from '../../assets/icons/arrow_back.svg';
import { isAuthUser } from 'redux/auth/selectors';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as FavoriteActiveIcon } from 'assets/icons/favorite-active.svg';
// import { ReactComponent as OptionDots } from 'assets/icons/option_dots.svg';
// import { hideAllTransport, hideTransport } from 'redux/filter/operations';

export const ItemPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newCars = useAppSelector(getNewCars);
  const [carInfo, setCarInfo] = useState<null | ITransport>(null);
  const [userDetailsInfo, setUserDetailsInfo] = useState<null | IUserDetails>(
    null,
  );
  // const [userInfo, setUserInfo] = useState<any>([]);
  // const [transportInfo, setTransportInfo] = useState<any>([]);
  const [userContacts, setUserContacts] = useState<null | IUserContacts>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [isShow, setIsShow] = useState<boolean>(false);
  const carDetails = useAppSelector(carDetail);
  const isAuth = useAppSelector(isAuthUser);
  // const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  // const [hideTransportAdvert, setHideTransportAdvert] =
  //   useState<boolean>(false);
  // const [hideAllTransportAdvert, setHideAllTransportAdvert] =
  //   useState<boolean>(false);

//     // if (userInfo.length > 0 && userDetailsInfo) {
//     const ishideAuthor = userInfo.length > 0 && userDetailsInfo ? userInfo[0].userName === userDetailsInfo.name:null;
// console.log('ishideAuthor :>> ', ishideAuthor);
//     // }
//     // if (carInfo && transportInfo.length > 0 ) {
//       const ishideTransport = carInfo && transportInfo.length > 0 ? carInfo?.id === transportInfo[0].transport.id:null;
//   console.log('ishideTransport :>> ', ishideTransport);
//       // }
// console.log('userInfo :>> ', userInfo);
//       console.log('transportInfo :>> ', transportInfo);
//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getHiddenUsersData();
//       setUserInfo(response);
//       setIsLoading(false);
//     } catch (error) {
//       console.log('error :>> ', error);
//     }
//   };
//   const fetchTransportsData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getHiddenTransportsData();
//       setTransportInfo(response);
//       setIsLoading(false);
//     } catch (error) {
//       console.log('error :>> ', error);
//     }
//   };
  // useEffect(() => {
  //   fetchData();
  //   fetchTransportsData();
  // }, []);
  // useEffect(() => {
  //   fetchData();
  //   fetchTransportsData();
  // }, [hideAllTransportAdvert, hideTransportAdvert]);
  const addFavorite = () => {
    if (!isAuth) {
      navigate('/login/log-in', { replace: true });
    }
    const carId = carInfo?.id ?? 0;
    if (carDetails?.isFavorite && carInfo) {
      dispatch(removeFromFavourites(carId));
    } else {
      dispatch(addToFavourites(carId));
    }
  };
  // useEffect(() => {
  //   if () {

  //   }
  // }, []);
  // const handleOptionMenu = () => {
  //   if (!isAuth) {
  //     navigate('/login/log-in', { replace: true });
  //   }
  //   setIsShowMenu(prev => !prev);
  // };
  // const handleHideAdvert = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   const buttonId = (e.target as HTMLElement).closest('button')?.id;
  //   if (buttonId === 'hideAdvert') {
  //     setHideTransportAdvert(true);
  //     carInfo && dispatch(hideTransport(carInfo.id));
  //   } else if (buttonId === 'hideAllAdverts') {
  //     setHideAllTransportAdvert(true);
  //     carInfo && dispatch(hideAllTransport(carInfo.id));
  //   }
  // };
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

  useEffect(() => {
    dispatch(fetchNewCars());
  }, [dispatch]);
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleBtnClick = () => {
    setIsShow(true);
  };
  return (
    <div className={styles.pageContainer}>
      <section className={styles.title_wrapper}>
        <div className={styles.title_container}>
          <button className={styles.btn_back} onClick={handleBackClick}>
            <Back className={styles.svg_btn} />
          </button>
          <div className={styles.info_container}>
            <h1 className={styles.main_title}>
              {' '}
              {carInfo && carDetails && userDetailsInfo ? (
                <span>
                  {`${carInfo.brand} ${carInfo.model} ${carInfo.year}`}
                  <span className={styles.delimiter}></span>
                  {`${carInfo.price} $`}
                </span>
              ) : (
                <div>{error}</div>
              )}{' '}
            </h1>

            <div className={styles.info_wrapper}>
              <button
                className={styles.favouriteIconContainer}
                onClick={addFavorite}
              >
                {carDetails && carDetails.isFavorite ? (
                  <FavoriteActiveIcon
                    className={styles.favoriteActiveIcon}
                    width="24px"
                  />
                ) : (
                  <FavoriteIcon className={styles.favoriteIcon} width="24px" />
                )}
              </button>
              {/* <button
                // style={{ display: isDisabled ? 'none' : '' }}
                type="button"
                className={styles.optionBtn}
                onClick={handleOptionMenu}
              >
                <OptionDots className={styles.option_dots} />
              </button>
              <div
                className={styles.optionMenu}
                style={{ display: isShowMenu ? 'flex' : 'none' }}
                onClick={handleHideAdvert}
              >
                <button type="button" id="hideAdvert">
                  Приховати оголошення
                </button>
                <button type="button" id="hideAllAdverts">
                  Приховати всі оголошення автора
                </button>
              </div>
              </div> */}

              <button
                className={styles.show_btn}
                onClick={handleBtnClick}
                style={{ display: isShow ? 'none' : '' }}
              >
                Звʼязатись з продавцем
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.container}>
        {carInfo && carDetails && userDetailsInfo ? (
          <>
            <div className={styles.pathItem} id="top">
              {/* Головна сторінка/Каталог/ <span className={styles.brand}>{carInfo.brand} {carInfo.model}</span> */}
            </div>
            <div className={styles.galleryPhotosContainer}>
              <ItemGallery carInfo={carInfo} carDetails={carDetails} />
              <div className={styles.galleryPhotosContainerRightSide}>
                {carInfo.galleries.map(
                  item =>
                    item.transportGalleryUrl && (
                      <ItemRightGalleryBigScreen
                        key={item.transportGalleryId}
                        url={item.transportGalleryUrl}
                      />
                    ),
                )}
              </div>
            </div>
            <div className={styles.itemInfoTop}>
              <div className={styles.itemInfoTopLeft}>
                {/* <div className={styles.titleSection}>
                  <p className={styles.titleName}>
                    {carInfo.brand} {carInfo.model} {carInfo.year}
                  </p>
                  <p className={styles.titlePrice}>{carInfo.price} $</p>
                </div> */}
                <div className={styles.mainCharacteristicsSection}>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={millageIcon}
                      alt="millage"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      {' '}
                      {carInfo.mileage} км пробігу
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={paymentsIcon}
                      alt="payments"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      {' '}
                      {carInfo.bargain ? 'Можливий торг' : 'Без торгу'}{' '}
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={addedIcon}
                      alt="created date"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      Додано {convertDateForCatalogItem(carDetails.created)}
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={transmissionIcon}
                      alt="transmission"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      {' '}
                      {carInfo.transmission}
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={colorIcon}
                      alt="color"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      {' '}
                      {carInfo.color}
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={updateIcon}
                      alt="update date"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      Оновилось{' '}
                      {convertDateForCatalogItem(carDetails.lastUpdated)}
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={locationIcon}
                      alt="location"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      місто {carInfo.city}
                    </p>
                  </div>
                  <div className={styles.mainCharacteristicsItem}>
                    <img
                      className={styles.mainCharacteristicsIcon}
                      src={viewIcon}
                      alt="views"
                    />
                    <p className={styles.mainCharacteristicsText}>
                      {carDetails.countViews}{' '}
                      {countViews(carDetails.countViews)}
                    </p>
                  </div>
                </div>

                <ProductDescription description={carInfo.description} />
              </div>
              {isAuth && (
                <SellerInfo
                  isShow={isShow}
                  handleShow={handleBtnClick}
                  userInfo={userDetailsInfo}
                  userContacts={userContacts}
                />
              )}
            </div>
            <Characteristics carInfo={carInfo} />
          </>
        ) : (
          <div>{error}</div>
        )}
      </div>
      {!isLoading && (
        <div className={styles.newGoods}>
          <CardSlider title={'Нові автомобілі на сайті'} cars={newCars} />
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
};
