import React, { useState } from 'react';
import styles from './Card.module.scss';
import eye from 'assets/icons/eye-open.svg';
import empty from 'assets/icons/empty_icon.svg';
import favorite from 'assets/icons/favorite.svg';
import clock from 'assets/icons/clock.svg';

export interface CardProps {
    data: {
        imageUrl: string;
        // title: string;
        brand: string,
        model: string,
        price: number;
        views: number;
        phoneViews: number;
        likes: number;
        createdAt: string;
        updatedAt: string;
        description: string;
    };
}

const Card: React.FC<CardProps> = ({ data }) => {
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handleButtonClick = () => {
        setIsButtonActive(!isButtonActive);
    };

    return (
        <div>
            <div className={styles.card}>
                <img src={data.imageUrl} alt="Car_image" className={styles.card_img} />
                <div className={styles.card_info}>
                    {/* <h3 className={styles.card_info_title}>{data.title}</h3> */}
                    <h3 className={styles.card_info_title}>{`${data.brand || ""} ${data.model || ''}`}</h3>
                    <p className={styles.card_info_price}>{data.price}</p>
                    <div className={styles.card_info_meta}>
                        <div className={styles.card_info_views}>
                            <img className={styles.icon} src={eye} alt="Eye icon" />
                            <p className={styles.card_info_data}>{`${data.views} переглядів`}</p>
                        </div>
                        <div className={styles.card_info_phoneViews}>
                            <img className={styles.icon} src={empty} alt="Empty icon" />
                            <p className={styles.card_info_data}>{`${data.phoneViews} покази телефону`}</p>
                        </div>
                        <div className={styles.card_info_likes}>
                            <img className={styles.icon} src={favorite} alt="Favorite icon" />
                            <p className={styles.card_info_data}>{data.likes}</p>
                        </div>
                        <div className={styles.card_info_createdAt}>
                            <img className={styles.icon} src={clock} alt="Clock icon" />
                            <p className={styles.card_info_data}>{data.createdAt}</p>
                        </div>
                        <div className={styles.card_info_updatedAt}>
                            <img className={styles.icon} src={clock} alt="Clock icon" />
                            <p className={styles.card_info_data}>{data.updatedAt}</p>
                        </div>
                    </div>

                    <p className={styles.card_info_description}>{data.description}</p>

                    <div className={styles.card_buttons}>
                        <button className={styles.button} onClick={handleButtonClick}>
                            Редагувати
                        </button>
                        <button className={styles.button}>Видалити</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;





