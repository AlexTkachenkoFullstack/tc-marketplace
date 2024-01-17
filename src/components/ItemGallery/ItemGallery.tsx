import React from 'react';
import styles from './ItemGallery.module.scss'
import imageIcon from 'assets/icons/image.svg'
import fullScreenIcon from 'assets/icons/fullscreen.svg'
import favoriteIcon from 'assets/icons/favorite.svg'
import favoriteActiveIcon from 'assets/icons/favorite-active.svg'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITransport } from 'types/ITransport';
import { ITransportDetails } from 'types/ITransportDetails';

interface ItemGalleryProps {
    carInfo: ITransport; 
    carDetails: ITransportDetails
  }


export const ItemGallery: React.FC<ItemGalleryProps> = ({carInfo, carDetails}) => {
    return (
        <div className={styles.galleryContainer}>
            <Swiper spaceBetween={'4px'} pagination={true} modules={[Pagination]}  className="mySwiper">
                {carInfo.galleries.map(item=>{
                return (<SwiperSlide key={item.transportGalleryId}>
                        <div className={styles.photoContainer}>
                            <img className={styles.image} src={item.transportGalleryUrl} alt={carInfo.brand}></img>
                            <div className={styles.imageCounterContainer}>
                                <img className={styles.iconImage} src={imageIcon} alt="icon" width='16px' />
                                <p className={styles.counterImageText}>{item.transportGalleryId} з {carInfo.galleries.length}</p>
                            </div>
                            <button onClick={()=>console.log('CLICK')} className={styles.fullScreenButton}>
                                <img className={styles.fullScreenIcon} src={fullScreenIcon} alt='show to full screen' width='20px'></img>
                            </button>
                            <button className={styles.favouriteIconContainer}>
                                {carDetails.isFavorite 
                                ? <img className={styles.favoriteActiveIcon} src={favoriteActiveIcon} alt='added to favorite' width='24px'></img>
                                : <img className={styles.favoriteIcon} src={favoriteIcon} alt='add to favorite' width='24px'></img>
                                }       
                            </button>
                        </div>
                </SwiperSlide>)
                })}
            </Swiper>
    </div>
    );
};
