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

SwiperCore.use([Autoplay]);

interface Props {
  title?: string;
}

export const CardSlider: React.FC<Props> = ({ title }) => {
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
        <div className={styles.sliderBtn}>
          <CommonBtn
            className={cn(styles.squareBtn, styles.squareBtn_left)}
            isDisabled={isPrevBtnDisabled}
            iconPath={ArrowLeft}
            onClick={() => handleClick('left')}
          />
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={'auto'}
          spaceBetween={16}
          className={"mySwiper"}
          breakpoints={{
            840: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            }
          }}
        >
          {Array.from({length: 10}).map((_, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <CardItem />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.sliderBtn}>
          <CommonBtn
            className={cn(styles.squareBtn, styles.squareBtn_right)}
            isDisabled={isNextBtnDisabled}
            iconPath={ArrowRight}
            onClick={() => handleClick('right')}
          />
        </div>
      </div>
    </section>
  );
};