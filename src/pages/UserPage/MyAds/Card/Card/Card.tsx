import React, { useState } from 'react';
import clockSvg from 'assets/icons/clock.svg'
import favorite from 'assets/icons/favorite.svg'
import eyeOpen from 'assets/icons/eye-open.svg'
import empty from 'assets/icons/empty_icon.svg'
import { CommonBtn } from 'components/Buttons/CommonBtn'
import { CardProperty } from 'components/CardProperty/CardProperty'
import styles from './Card.module.scss'

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

    const getPriceString = (number: number) => {
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;
    }
    return (
        <div className={styles.container}>
            <img alt='car_image' src={car?.fileUrl || 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} className={styles.image} />
            <div className={styles.header}>
                <div>
                    <p className={styles.title}>{`${car?.brand} ${car?.model || 'Model'}`}</p>
                    <p className={styles.price}>{getPriceString(car?.price)}</p>
                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.properties}>
                    {/* to do */}
                    {/* change property params when will be correct type or interface */}
                    <CardProperty icon={eyeOpen} name={`${data.views} переглядів` || 'нема переглядів'} />
                    <CardProperty icon={empty} name={`${car.openedPhoneCount}` || 'нема показів телефону'} />
                    <CardProperty icon={favorite} name={car.likes.toString()} />
                    <CardProperty icon={clockSvg} name={convertDate(data.created)} />
                    <CardProperty icon={clockSvg} name={convertDate(data.updated)} />
                </div>
                <p className={styles.description__text}>
                    {car?.description}
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