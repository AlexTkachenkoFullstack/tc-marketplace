import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/swiper-bundle.min.css';
import '../../styles/blocks/_container.scss';
import styles from './CardSlider.module.scss';
import { CardItem } from 'components/CardItem';
import ArrowLeft from '../../assets/icons/arrow_left.svg';
import ArrowRight from '../../assets/icons/arrow_right.svg';
import { CommonBtn } from 'components/Buttons/CommonBtn';
import { ICar } from 'types/IСar';

SwiperCore.use([Autoplay]);

interface Props {
  title?: string;
  cars?: ICar[] | [];
}

export const CardSlider: React.FC<Props> = ({ title, cars }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const handleClick = (direction: string) => {
    if (direction === 'right') {
      swiperRef?.slideNext();
    } else {
      swiperRef?.slidePrev();
    }
    setIsPrevBtnDisabled(() => swiperRef?.isBeginning as boolean);
    setIsNextBtnDisabled(() => swiperRef?.isEnd as boolean);
  };
  useEffect(() => {
    setIsNextBtnDisabled(
      () =>
        (swiperRef?.isBeginning as boolean) && (swiperRef?.isEnd as boolean),
    );
  }, [swiperRef?.isBeginning, swiperRef?.isEnd]);

  return (
    <section className={styles.slider}>
      <div className="container">
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.navBtns}>
            <CommonBtn
              className={cn(styles.squareBtn, styles.squareBtn_left)}
              isDisabled={isPrevBtnDisabled}
              iconPath={ArrowLeft}
              onClick={() => handleClick('left')}
            />

            <CommonBtn
              className={cn(styles.squareBtn, styles.squareBtn_right)}
              isDisabled={isNextBtnDisabled}
              iconPath={ArrowRight}
              onClick={() => handleClick('right')}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <Swiper
          // style={{ width: '100%' }}
          onSwiper={setSwiperRef}
          // slidesPerView={'auto'}
          // spaceBetween={24}
          className={styles.swiper}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {cars?.map((car, index) => (
            <SwiperSlide
              className={styles.slide}
              key={index}
              // style={{ width: '400px' }}
            >
              <CardItem car={car} key={car.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
