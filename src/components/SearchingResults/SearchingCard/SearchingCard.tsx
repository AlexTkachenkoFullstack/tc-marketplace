import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cn from 'classnames';
import styles from './SearchingCard.module.scss';

import LikeImg from '../../../assets/icons/favorite.svg';
import ActiveLikeImg from '../../../assets/icons/favorite-active.svg';
import { CommonBtn } from "components/Buttons/CommonBtn";
import { ICar } from "types/IСar";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { isAuthUser } from "redux/auth/selectors";
import { addToFavourites, removeFromFavourites } from "redux/cars/operations";
import { ReactComponent as EmptyIcon } from "../../../assets/icons/empty_icon.svg";
import { ReactComponent as OptionDots } from "../../../assets/icons/option_dots.svg";
import { ReactComponent as ClockIcon } from "../../../assets/icons/clock.svg";
import { convertDate } from "utils/convertDate";

interface Props {
    car?: ICar;
}

export const SearchingCard: React.FC<Props> = ({ car }) => {
    const dispatch=useAppDispatch()
    const isAuth=useAppSelector(isAuthUser);
    const navigate = useNavigate();
    const addFavorite=()=> {
        if(!isAuth){
            navigate('/login/log-in', { replace: true })
        }
        if(car?.isFavorite){
            car && dispatch(removeFromFavourites(car?.id))
        }else{
           car && dispatch(addToFavourites(car?.id))
        }

    }
    const created = car?.created ? convertDate(car.created) : ""


    const [isOverflowEllipsis, setIsOverflowEllipsis] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
       const paragraph = descriptionRef.current;
        if (paragraph) {
            const lines: number | undefined = paragraph.textContent?.split('\n').length;
            if (lines && lines > 2) {
                setIsOverflowEllipsis(true);
            } else {
                setIsOverflowEllipsis(false);
            }
        }
    }, []);
    const descriptionClassName = cn(styles.description, {
        'overflowEllipsis': isOverflowEllipsis
    });

    return (
        <article className={styles.card} >      
                <div className={styles.photo}>
                    <NavLink to={`/catalog/${car?.id}`} className={styles.link} >
                        <img
                          className={styles.img}
                          src={car?.fileUrl}
                          alt={car?.brand}
                        />  
                    </NavLink>
                    <div className={styles.iconIsFavouriteContainer} onClick={addFavorite}>
                        <CommonBtn 
                            iconPath={car?.isFavorite && isAuth ? ActiveLikeImg : LikeImg}
                            className={cn(styles.likeBtn)}
                        />
                     </div>
                </div>
                <div className={styles.infoContainer}>
                    <button type="button" className={styles.optionBtn}>
                        <OptionDots/>
                        </button>
                    <div className={styles.col}>
                        <h3 className={styles.title}>{car?.brand} {car?.model} {car?.year}</h3>
                    </div>
                    <p className={styles.price}>{car?.price} $</p>
                    <ul className={styles.techSpecs}>
                      
                      <li className={styles.techSpec}>
                        <EmptyIcon className={styles.emptyIcon}/>
                        {car && car.mileage !== undefined ? `${Math.floor(car.mileage / 1000)} тис. км` : "Нема данних"}
                      </li>
                      <li className={styles.techSpec}>
                        <EmptyIcon className={styles.emptyIcon}/>
                        {car?.city}
                      </li>
                      <li className={styles.techSpec}>
                        <EmptyIcon className={styles.emptyIcon}/>
                        {car?.transmission}
                      </li>
                      <li className={styles.techSpec}>
                        <EmptyIcon className={styles.emptyIcon}/>
                        {car?.fuelType}, {car?.engineDisplacement}л
                      </li>
                      <li className={styles.techSpec}>
                        <EmptyIcon className={styles.emptyIcon}/>
                        {car?.year} рік
                      </li>
                     </ul>
                    
                       <p ref={descriptionRef} id="discr" className={descriptionClassName}>{car?.description}</p>
                     
                    
                    <p className={styles.created}>
                        <ClockIcon className={styles.clockIcon}/>
                        {created}
                    </p>
                </div>  
        </article>
    )
};