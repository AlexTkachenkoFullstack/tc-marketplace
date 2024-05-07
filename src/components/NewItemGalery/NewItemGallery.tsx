import React, { useState } from 'react'
import styles from './NewItemGallery.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react';
import { ITransport } from 'types/ITransport';
import { ITransportDetails } from 'types/ITransportDetails';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { isAuthUser } from 'redux/auth/selectors';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.css';
import { FreeMode, Navigation, Thumbs } from 'swiper';
interface ItemGalleryProps {
    carInfo: any[]; 
    // carDetails: ITransportDetails
  }

export const NewItemGallery:React.FC<ItemGalleryProps> = ({carInfo}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  return (
    <div className={styles.galleryContainer}>
    <Swiper 
   style={{
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  } as React.CSSProperties}
  spaceBetween={10}
  navigation={true}
  thumbs={{ swiper: thumbsSwiper }}
  modules={[FreeMode, Navigation, Thumbs]}
  className="mySwiper2"
      >
        {carInfo.map((item:any)=>{
        return (<SwiperSlide key={item.id}>
               <img src={item.fileUrl} />   
        </SwiperSlide>)
        })}
    </Swiper>
    <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {carInfo.map((item:any)=>{
        return (<SwiperSlide key={item.id}>
               <img src={item.fileUrl} />   
        </SwiperSlide>)
        })}
      </Swiper>
</div>
  )
}
