import React, { useEffect, useMemo, useState } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/swiper-bundle.min.css';

import '../../styles/blocks/_container.scss';
import styles from './CardSlider.module.scss';
import { CardItem } from 'components/CardItem';

SwiperCore.use([Autoplay]);

interface Props {
  title?: string;
}

export const CardSlider: React.FC<Props> = ({ title }) => {
  const [countSlides, setCountSlides] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1280) {
        setCountSlides(3);
        return;
      }

      setCountSlides(2);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={styles.slider}>
      <div className="container">
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>

      <div className={styles.content}>
        <Swiper
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
          <SwiperSlide className={styles.slide}>
            <CardItem />
          </SwiperSlide>

          <SwiperSlide className={styles.slide}>
            <CardItem />
          </SwiperSlide>

          <SwiperSlide className={styles.slide}>
            <CardItem />
          </SwiperSlide>

          <SwiperSlide className={styles.slide}>
            <CardItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
