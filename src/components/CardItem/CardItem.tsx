import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import cn from 'classnames';
import styles from './CardItem.module.scss';

// import LikeImg from '../../assets/icons/favorite.svg';
// import ActiveLikeImg from '../../assets/icons/favorite-active.svg';
import imagePlug from '../../assets/images/imagePlug.webp';
// import { CommonBtn } from 'components/Buttons/CommonBtn';
import { ICar } from 'types/IСar';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { isAuthUser } from 'redux/auth/selectors';
import { addToFavourites, fetchFavoriteCars, removeFromFavourites } from 'redux/cars/operations';
import { ReactComponent as Millage } from '../../assets/icons/millage.svg';
import { ReactComponent as Transmission } from '../../assets/icons/transmission.svg';
import { ReactComponent as Fuel } from '../../assets/icons/fuel.svg';
// import { ReactComponent as CalendarMonth } from '../../../assets/icons/calendar_month.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import { ReactComponent as Favorite } from '../../assets/icons/favorite.svg';
import { ReactComponent as FavoriteActive } from '../../assets/icons/favorite-active.svg';
interface Props {
  car?: ICar;
}

export const CardItem: React.FC<Props> = ({ car }) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthUser);
  const navigate = useNavigate();
  const addFavorite = () => {
    if (!isAuth) {
      navigate('/login/log-in', { replace: true });
    }
    if (car?.isFavorite) {
      car && dispatch(removeFromFavourites(car?.id)).then(()=>dispatch(fetchFavoriteCars()));   
    } else {
      car && dispatch(addToFavourites(car?.id)).then(()=>dispatch(fetchFavoriteCars()));   
    }
  };

  const onSrcImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = imagePlug;
  };

  return (
    <article className={styles.card}>
      <NavLink to={`/catalog/${car?.id}`} className={styles.link}>
        <div className={styles.photo}>
          <img
            className={styles.img}
            src={car?.fileUrl}
            alt={car?.brand}
            onError={onSrcImageError}
          />
        </div>
      </NavLink>
      <div className={styles.col}>
        <h3 className={styles.title}>
          {car?.brand} {car?.model} {car?.year}
        </h3>
        <button
          className={styles.iconIsFavouriteContainer}
          onClick={addFavorite}
        >
          {/* <CommonBtn
            iconPath={car?.isFavorite && isAuth ? ActiveLikeImg : LikeImg}
            className={cn(styles.likeBtn)}
          /> */}
          {car?.isFavorite && isAuth ? (
            <FavoriteActive />
          ) : (
            <Favorite className={styles.favorite} />
          )}
        </button>
      </div>
      <p className={styles.price}>{car?.price} $</p>
      <ul className={styles.techSpecs}>
        <div className={styles.wrapper}>
          <li className={styles.techSpec}>
            <Millage className={styles.emptyIcon} />
            {car && car.mileage !== undefined
              ? `${Math.floor(car.mileage / 1000)} тис. км`
              : 'Нема данних'}
          </li>
          <li className={styles.techSpec}>
            <Location className={styles.emptyIcon} />
            {car?.city}
          </li>
        </div>
        <div className={styles.wrapper}>
          <li className={styles.techSpec}>
            <Transmission className={styles.emptyIcon} />
            {car?.transmission}
          </li>
          <li className={styles.techSpec}>
            <Fuel className={styles.emptyIcon} />
            {car?.fuelType}, {car?.engineDisplacement}л
          </li>
        </div>
      </ul>
      <li className={styles.techSpec}>{car?.year} рік</li>
    </article>
  );
};
