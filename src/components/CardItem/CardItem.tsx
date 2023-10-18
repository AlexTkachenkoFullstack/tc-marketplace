import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from 'classnames';

import styles from './CardItem.module.scss';

import LikeImg from '../../assets/icons/favorite.svg';
import ActiveLikeImg from '../../assets/icons/favorite-active.svg';
import { CommonBtn } from "components/Buttons/CommonBtn";
import { ICar } from "types/IСar";

interface Props {
    car?: ICar;
}

export const CardItem: React.FC = () => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <article className={styles.card}>
            <NavLink
                to="cardItem"
                className={styles.photo}
            >
                <img
                    className={styles.img}
                    src="https://cdn2.riastatic.com/photosnew/auto/photo/volkswagen_touareg__516475592hd.webp"
                    alt="Volkswagen Touareg 2021"
                />
            </NavLink>

            <div className={styles.col}>
                <NavLink to="/Volkswagen_Touareg_2021" className={styles.link}>
                    <h3 className={styles.title}>Volkswagen Touareg 2021</h3>
                </NavLink>

                <div>
                    <CommonBtn
                        iconPath={isLiked ? ActiveLikeImg : LikeImg}
                        className={cn(styles.likeBtn)}
                        onClick={() => setIsLiked(!isLiked)}
                    />
                </div>
            </div>


            <p className={styles.price}>71 500 $</p>

            <ul className={styles.techSpecs}>
                <li className={styles.techSpec}>120 тис. км</li>
                <li className={styles.techSpec}>Харків</li>
                <li className={styles.techSpec}>Автомат</li>
                <li className={styles.techSpec}>бензин</li>
                <li className={styles.techSpec}>2021 рік</li>
            </ul>
        </article>
    )
};
