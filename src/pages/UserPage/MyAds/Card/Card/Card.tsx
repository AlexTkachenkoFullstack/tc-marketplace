import React, { useState } from 'react';
import styles from './Card.module.scss';
import clockSvg from 'assets/icons/clock.svg'
import favorite from 'assets/icons/favorite.svg'
import eyeOpen from 'assets/icons/eye-open.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import { convertDate } from 'utils/convertDate';
import { IAd } from 'types/IAd';

export interface CardProps {
    car: IAd
}

const Card: React.FC<CardProps> = ({ car }) => {
    const [isButtonActive, setIsButtonActive] = useState(false);
    convertDate(car.created)
    const handleButtonClick = () => {
        setIsButtonActive(!isButtonActive);
    };

    return (
        <div>
            <div className={styles.card}>
                <img src={car.fileUrl} alt={car.brand} className={styles.card_img} />
                <div className={styles.card_info}>
                    <div className={styles.card_info_top}>
                        <h3 className={styles.card_info_title}>{car.brand} {car.model} {car.year}</h3>
                        <p className={styles.card_info_price}>{car.price} $</p>

                        <div className={styles.description}>
                            <div className={styles.properties}>

                            </div>
                            <p className={styles.description__text}>
                                {data?.description}
                            </p>
                            <div className={styles.description__buttons}>
                                <CommonBtn
                                    children={'Редагувати'}
                                    className={styles.button_primary}
                                    onClick={() => { alert('redact') }}
                                />
                                <CommonBtn
                                    children={'Видалити'}
                                    className={styles.button_secondary}
                                    onClick={() => { alert('delete') }}
                                />

                            </div>
                        </div>
                    </div>
                    )
}